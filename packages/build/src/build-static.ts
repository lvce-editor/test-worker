import { cp, readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { exportStatic } from '@lvce-editor/shared-process'
import { root } from './root.ts'

process.env.PATH_PREFIX = '/test-worker'
const { commitHash } = await exportStatic({
  root,
  extensionPath: '',
  testPath: 'packages/e2e',
})

const rendererWorkerPath = join(root, 'dist', commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')

export const getRemoteUrl = (path: string): string => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const content = await readFile(rendererWorkerPath, 'utf8')
const workerPath = join(root, '.tmp/dist/dist/testWorkerMain.js')
const remoteUrl = getRemoteUrl(workerPath)

const productionFallback = '${assetDir}/packages/test-worker/dist/testWorkerMain.js'
if (!content.includes(remoteUrl)) {
  throw new Error('linked test worker fallback not found')
}
await writeFile(rendererWorkerPath, content.replace(remoteUrl, productionFallback))

await cp(workerPath, join(root, 'dist', commitHash, 'packages', 'test-worker', 'dist', 'testWorkerMain.js'))
const productionUrl = `/test-worker/${commitHash}/packages/test-worker/dist/testWorkerMain.js`
for (const file of await readdir(join(root, 'dist'), { recursive: true })) {
  if (!file.endsWith('.html')) {
    continue
  }
  const filePath = join(root, 'dist', file)
  const html = await readFile(filePath, 'utf8')
  await writeFile(filePath, html.replaceAll(remoteUrl, productionUrl))
}

await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
