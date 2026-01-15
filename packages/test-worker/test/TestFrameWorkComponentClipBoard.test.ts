import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ClipBoard from '../src/parts/TestFrameWorkComponentClipBoard/TestFrameworkComponentClipBoard.ts'

const setup = (): any => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.disableMemoryClipBoard'() {
      return undefined
    },
    'ClipBoard.enableMemoryClipBoard'() {
      return undefined
    },
    'ClipBoard.readNativeFiles'() {
      return undefined
    },
    'ClipBoard.writeNativeFiles'() {
      return undefined
    },
  })
  return mockRpc
}

test('readNativeFiles', async () => {
  using mockRpc = setup()
  await ClipBoard.readNativeFiles()
  expect(mockRpc.invocations).toEqual([['ClipBoard.readNativeFiles']])
})

test('writeNativeFiles', async () => {
  using mockRpc = setup()
  const uris = ['file:///a', 'file:///b']
  await ClipBoard.writeNativeFiles(uris)
  expect(mockRpc.invocations).toEqual([['ClipBoard.writeNativeFiles', uris]])
})

test('enableMemoryClipBoard', async () => {
  using mockRpc = setup()
  await ClipBoard.enableMemoryClipBoard()
  expect(mockRpc.invocations).toEqual([['ClipBoard.enableMemoryClipBoard']])
})

test('disableMemoryClipBoard', async () => {
  using mockRpc = setup()
  await ClipBoard.disableMemoryClipBoard()
  expect(mockRpc.invocations).toEqual([['ClipBoard.disableMemoryClipBoard']])
})

test('shouldHaveText - correct', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readMemoryText'() {
      return 'hello'
    },
  })
  await ClipBoard.shouldHaveText('hello')
  expect(mockRpc.invocations).toEqual([['ClipBoard.readMemoryText']])
})

test('shouldHaveText - wrong', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readMemoryText'() {
      return 'world'
    },
  })
  await expect(ClipBoard.shouldHaveText('hello')).rejects.toThrow('expected clipboard to have text "hello" but was "world"')
  expect(mockRpc.invocations).toEqual([['ClipBoard.readMemoryText']])
})

test('shouldHaveText - regex success', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readMemoryText'() {
      return 'Hello World 123'
    },
  })
  await ClipBoard.shouldHaveText(/Hello.*\d+/)
  expect(mockRpc.invocations).toEqual([['ClipBoard.readMemoryText']])
})

test('shouldHaveText - regex error', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readMemoryText'() {
      return 'Hello World'
    },
  })
  await expect(ClipBoard.shouldHaveText(/Hello.*\d+/)).rejects.toThrow('expected clipboard to have text "/Hello.*\\d+/" but was "Hello World"')
  expect(mockRpc.invocations).toEqual([['ClipBoard.readMemoryText']])
})
