import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ClipBoard from '../src/parts/TestFrameWorkComponentClipBoard/TestFrameworkComponentClipBoard.ts'

const setup = (): any => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readNativeFiles'() {
      return undefined
    },
    'ClipBoard.writeNativeFiles'() {
      return undefined
    },
    'ClipBoard.enableMemoryClipBoard'() {
      return undefined
    },
    'ClipBoard.disableMemoryClipBoard'() {
      return undefined
    },
  })
  return mockRpc
}

test('readNativeFiles', async () => {
  const mockRpc = setup()
  await ClipBoard.readNativeFiles()
  expect(mockRpc.invocations).toEqual([['ClipBoard.readNativeFiles']])
})

test('writeNativeFiles', async () => {
  const mockRpc = setup()
  const uris = ['file:///a', 'file:///b']
  await ClipBoard.writeNativeFiles(uris)
  expect(mockRpc.invocations).toEqual([['ClipBoard.writeNativeFiles', uris]])
})

test('enableMemoryClipBoard', async () => {
  const mockRpc = setup()
  await ClipBoard.enableMemoryClipBoard()
  expect(mockRpc.invocations).toEqual([['ClipBoard.enableMemoryClipBoard']])
})

test('disableMemoryClipBoard', async () => {
  const mockRpc = setup()
  await ClipBoard.disableMemoryClipBoard()
  expect(mockRpc.invocations).toEqual([['ClipBoard.disableMemoryClipBoard']])
})

test('shouldHaveText - correct', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readMemoryText'() {
      return 'hello'
    },
  })
  await ClipBoard.shouldHaveText('hello')
  expect(mockRpc.invocations).toEqual([['ClipBoard.readMemoryText']])
})

test('shouldHaveText - wrong', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readMemoryText'() {
      return 'world'
    },
  })
  await expect(ClipBoard.shouldHaveText('hello')).rejects.toThrow('expected clipboard to have text "hello" but was "world"')
  expect(mockRpc.invocations).toEqual([['ClipBoard.readMemoryText']])
})
