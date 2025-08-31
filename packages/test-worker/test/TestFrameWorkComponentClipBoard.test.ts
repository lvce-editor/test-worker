import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ClipBoard from '../src/parts/TestFrameWorkComponentClipBoard/TestFrameworkComponentClipBoard.ts'

const setup = () => {
  const invoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke })
  RendererWorker.set(mockRpc)
  return invoke
}

test('readNativeFiles', async () => {
  const invoke = setup()
  await ClipBoard.readNativeFiles()
  expect(invoke).toHaveBeenCalledWith('ClipBoard.readNativeFiles')
})

test('writeNativeFiles', async () => {
  const invoke = setup()
  const uris = ['file:///a', 'file:///b']
  await ClipBoard.writeNativeFiles(uris)
  expect(invoke).toHaveBeenCalledWith('ClipBoard.writeNativeFiles', uris)
})

test('enableMemoryClipBoard', async () => {
  const invoke = setup()
  await ClipBoard.enableMemoryClipBoard()
  expect(invoke).toHaveBeenCalledWith('ClipBoard.enableMemoryClipBoard')
})

test('disableMemoryClipBoard', async () => {
  const invoke = setup()
  await ClipBoard.disableMemoryClipBoard()
  expect(invoke).toHaveBeenCalledWith('ClipBoard.disableMemoryClipBoard')
})

test('shouldHaveText - correct', async () => {
  const invoke = jest.fn(async (method: string) => {
    if (method === 'ClipBoard.readMemoryText') {
      return 'hello'
    }
    throw new Error('unexpected method')
  })
  const mockRpc = MockRpc.create({ commandMap: {}, invoke })
  RendererWorker.set(mockRpc)
  await ClipBoard.shouldHaveText('hello')
  expect(invoke).toHaveBeenCalledWith('ClipBoard.readMemoryText')
})

test('shouldHaveText - wrong', async () => {
  const invoke = jest.fn(async (method: string) => {
    if (method === 'ClipBoard.readMemoryText') {
      return 'world'
    }
    throw new Error('unexpected method')
  })
  const mockRpc = MockRpc.create({ commandMap: {}, invoke })
  RendererWorker.set(mockRpc)
  await expect(ClipBoard.shouldHaveText('hello')).rejects.toThrow('expected clipboard to have text "hello" but was "world"')
  expect(invoke).toHaveBeenCalledWith('ClipBoard.readMemoryText')
})
