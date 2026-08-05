import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ClipBoard from '../src/parts/TestFrameWorkComponentClipBoard/TestFrameworkComponentClipBoard.ts'

const helloNumberRegex = /Hello\D+\d+/
const emailRegex = /test@example\.com/

test('readNativeFiles', async () => {
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
  await ClipBoard.readNativeFiles()
  expect(mockRpc.invocations).toEqual([['ClipBoard.readNativeFiles']])
})

test('writeNativeFiles', async () => {
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
  const uris = ['file:///a', 'file:///b']
  await ClipBoard.writeNativeFiles(uris)
  expect(mockRpc.invocations).toEqual([['ClipBoard.writeNativeFiles', uris]])
})

test('enableMemoryClipBoard', async () => {
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
  await ClipBoard.enableMemoryClipBoard()
  expect(mockRpc.invocations).toEqual([['ClipBoard.enableMemoryClipBoard']])
})

test('disableMemoryClipBoard', async () => {
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

test('shouldHaveImage - correct', async () => {
  const expectedUri = 'file:///expected.png'
  const image = new Blob([new Uint8Array([1, 2, 3])], { type: 'image/png' })
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readMemoryImage'() {
      return image
    },
    'FileSystem.getBlob'() {
      return image
    },
  })

  await ClipBoard.shouldHaveImage(expectedUri)

  expect(mockRpc.invocations).toEqual([['ClipBoard.readMemoryImage'], ['FileSystem.getBlob', expectedUri]])
})

test('shouldHaveImage - no image', async () => {
  const expectedUri = 'file:///expected.png'
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readMemoryImage'() {
      return undefined
    },
  })

  await expect(ClipBoard.shouldHaveImage(expectedUri)).rejects.toThrow(`expected clipboard to have image "${expectedUri}" but it had no image`)
  expect(mockRpc.invocations).toEqual([['ClipBoard.readMemoryImage']])
})

test('shouldHaveImage - different contents', async () => {
  const expectedUri = 'file:///expected.png'
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readMemoryImage'() {
      return new Blob([new Uint8Array([1, 4, 3])], { type: 'image/png' })
    },
    'FileSystem.getBlob'() {
      return new Blob([new Uint8Array([1, 2, 3])], { type: 'image/png' })
    },
  })

  await expect(ClipBoard.shouldHaveImage(expectedUri)).rejects.toThrow(
    `expected clipboard image to match "${expectedUri}" but contents differed at byte 1 (expected 3 bytes, got 3)`,
  )
  expect(mockRpc.invocations).toEqual([['ClipBoard.readMemoryImage'], ['FileSystem.getBlob', expectedUri]])
})

test('shouldHaveImage - different sizes', async () => {
  const expectedUri = 'file:///expected.png'
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readMemoryImage'() {
      return new Blob([new Uint8Array([1, 2])], { type: 'image/png' })
    },
    'FileSystem.getBlob'() {
      return new Blob([new Uint8Array([1, 2, 3])], { type: 'image/png' })
    },
  })

  await expect(ClipBoard.shouldHaveImage(expectedUri)).rejects.toThrow(
    `expected clipboard image to match "${expectedUri}" but contents differed at byte 2 (expected 3 bytes, got 2)`,
  )
  expect(mockRpc.invocations).toEqual([['ClipBoard.readMemoryImage'], ['FileSystem.getBlob', expectedUri]])
})

test('shouldHaveText - regex success', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readMemoryText'() {
      return 'Hello World 123'
    },
  })
  await ClipBoard.shouldHaveText(helloNumberRegex)
  expect(mockRpc.invocations).toEqual([['ClipBoard.readMemoryText']])
})

test('shouldHaveText - regex error', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readMemoryText'() {
      return 'Hello World'
    },
  })
  await expect(ClipBoard.shouldHaveText(helloNumberRegex)).rejects.toThrow('expected clipboard to have text "/Hello\\D+\\d+/" but was "Hello World"')
  expect(mockRpc.invocations).toEqual([['ClipBoard.readMemoryText']])
})

test('writeText', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText'(text: string) {
      return undefined
    },
  })
  const text = 'test content'
  await ClipBoard.writeText(text)
  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', text]])
})

test('shouldHaveText - empty string', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readMemoryText'() {
      return ''
    },
  })
  await ClipBoard.shouldHaveText('')
  expect(mockRpc.invocations).toEqual([['ClipBoard.readMemoryText']])
})

test('shouldHaveText - special characters', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readMemoryText'() {
      return 'Hello\nWorld\t!'
    },
  })
  await ClipBoard.shouldHaveText('Hello\nWorld\t!')
  expect(mockRpc.invocations).toEqual([['ClipBoard.readMemoryText']])
})

test('shouldHaveText - regex with special characters', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readMemoryText'() {
      return 'test@example.com'
    },
  })
  await ClipBoard.shouldHaveText(emailRegex)
  expect(mockRpc.invocations).toEqual([['ClipBoard.readMemoryText']])
})
