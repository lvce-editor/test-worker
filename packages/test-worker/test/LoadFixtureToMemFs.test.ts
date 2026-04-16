import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { loadFixtureToMemFs } from '../src/parts/LoadFixtureToMemFs/LoadFixtureToMemFs.ts'

test('loadFixtureToMemFs writes files in parallel', async () => {
  let resolveFirstWrite: () => void = () => {}
  let isFirstWrite = true

  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.writeFile'() {
      if (isFirstWrite) {
        isFirstWrite = false
        return new Promise<void>((resolve) => {
          resolveFirstWrite = resolve
        })
      }
      return undefined
    },
  })

  const fileMap = {
    'file-1.txt': 'content-1',
    'file-2.txt': 'content-2',
  }

  const resultPromise = loadFixtureToMemFs(fileMap)

  await Promise.resolve()

  expect(mockRpc.invocations).toEqual([
    ['FileSystem.writeFile', 'memfs:///fixture/file-1.txt', 'content-1'],
    ['FileSystem.writeFile', 'memfs:///fixture/file-2.txt', 'content-2'],
  ])

  resolveFirstWrite()

  await expect(resultPromise).resolves.toBe('memfs:///fixture')
})
