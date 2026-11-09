import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { cp, mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { pathToFileURL } from 'node:url'
import { root } from '../src/root.ts'

const getWorkerPath = (html: string): string => {
  const match = html.match(/"develop\.testWorkerPath":\s*"([^"]+)"/)
  assert.ok(match, 'HTML must configure the test worker')
  return match[1]
}

const workerPath = join(root, '.tmp', 'dist', 'dist', 'testWorkerMain.js')

// These checks run after build and build:static in the CI matrix.
test('static export selects the locally built worker under the deployment prefix', async () => {
  for (const directory of ['dist', '.tmp/static']) {
    const html = await readFile(join(root, directory, 'index.html'), 'utf8')
    const url = getWorkerPath(html)
    assert.match(url, /^\/test-worker\/[^/]+\/packages\/test-worker\/dist\/testWorkerMain\.js$/)
    assert.ok(!html.includes('/remote/'))
    const exportedWorker = await readFile(join(root, directory, url.slice('/test-worker/'.length)))
    assert.deepEqual(exportedWorker, await readFile(workerPath))
  }
})

for (const [directory, link] of [
  [root, '.tmp/dist'],
  [join(root, 'packages', 'server'), '../../.tmp/dist'],
  [root, ''],
]) {
  test(`server selects the local worker from ${directory} using ${link || 'a path with spaces'}`, { timeout: 30_000 }, async () => {
    const profile = await mkdtemp(join(tmpdir(), 'test-worker server '))
    const linkedPath = link || join(profile, 'worker with spaces')
    if (!link) {
      await cp(join(root, '.tmp', 'dist'), linkedPath, { recursive: true })
    }
    const expectedWorkerPath = link ? workerPath : join(linkedPath, 'dist', 'testWorkerMain.js')
    const child = spawn(process.execPath, [join(root, 'node_modules/@lvce-editor/server/bin/server.js'), `--link=${linkedPath}`], {
      cwd: directory,
      timeout: 25_000,
      env: {
        ...process.env,
        HOST: '127.0.0.1',
        PORT: '0',
        XDG_CONFIG_HOME: join(profile, 'config'),
        XDG_DATA_HOME: join(profile, 'data'),
        XDG_CACHE_HOME: join(profile, 'cache'),
        XDG_STATE_HOME: join(profile, 'state'),
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    const exited = once(child, 'exit')
    try {
      let output = ''
      let origin = ''
      for await (const chunk of child.stdout.iterator({ destroyOnReturn: false })) {
        output += chunk
        origin = output.match(/listening on (http:\/\/127\.0\.0\.1:\d+)/)?.[1] || ''
        if (origin) {
          break
        }
      }
      child.stdout.resume()
      assert.ok(origin, output)
      const response = await fetch(`${origin}/tests/_all.html`, { signal: AbortSignal.timeout(15_000) })
      assert.equal(response.status, 200)
      const url = getWorkerPath(await response.text())
      assert.equal(url, `/remote${pathToFileURL(expectedWorkerPath).pathname}`)
      const workerResponse = await fetch(`${origin}${url}`, { signal: AbortSignal.timeout(15_000) })
      assert.equal(workerResponse.status, 200)
      assert.deepEqual(Buffer.from(await workerResponse.arrayBuffer()), await readFile(workerPath))
    } finally {
      child.kill()
      await exited
      await rm(profile, { recursive: true, force: true })
    }
  })
}
