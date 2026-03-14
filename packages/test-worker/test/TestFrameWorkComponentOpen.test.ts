import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Open from '../src/parts/TestFrameWorkComponentOpen/TestFrameworkComponentOpen.ts'

test('enableMemoryOpener', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Open.enableMemoryOpener'() {
      return undefined
    },
  })
  await Open.enableMemoryOpener()
  expect(mockRpc.invocations).toEqual([['Open.enableMemoryOpener']])
})

test('disableMemoryOpener', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Open.disableMemoryOpener'() {
      return undefined
    },
  })
  await Open.disableMemoryOpener()
  expect(mockRpc.invocations).toEqual([['Open.disableMemoryOpener']])
})

test('shouldHaveUrl - string success', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Open.readMemoryUrl'() {
      return 'https://example.com'
    },
  })
  await Open.shouldHaveUrl('https://example.com')
  expect(mockRpc.invocations).toEqual([['Open.readMemoryUrl']])
})

test('shouldHaveUrl - string error', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Open.readMemoryUrl'() {
      return 'https://wrong.example.com'
    },
  })
  await expect(Open.shouldHaveUrl('https://example.com')).rejects.toThrow(
    'expected opened url to be "https://example.com" but was "https://wrong.example.com"',
  )
  expect(mockRpc.invocations).toEqual([['Open.readMemoryUrl']])
})

test('shouldHaveUrl - regex success', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Open.readMemoryUrl'() {
      return 'https://example.com/path/123'
    },
  })
  await Open.shouldHaveUrl(/https:\/\/example\.com\/path\/\d+/)
  expect(mockRpc.invocations).toEqual([['Open.readMemoryUrl']])
})

test('shouldHaveUrl - regex error', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Open.readMemoryUrl'() {
      return 'https://example.com/path/no-number'
    },
  })
  await expect(Open.shouldHaveUrl(/https:\/\/example\.com\/path\/\d+/)).rejects.toThrow(
    'expected opened url to be "/https:\\/\\/example\\.com\\/path\\/\\d+/" but was "https://example.com/path/no-number"',
  )
  expect(mockRpc.invocations).toEqual([['Open.readMemoryUrl']])
})
