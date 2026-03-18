import { expect, test } from '@jest/globals'
import { OpenerWorker } from '@lvce-editor/rpc-registry'
import * as Open from '../src/parts/TestFrameWorkComponentOpen/TestFrameworkComponentOpen.ts'

test('enableMemoryOpener', async () => {
  using mockRpc = OpenerWorker.registerMockRpc({
    'Open.enableMemoryOpener'() {
      return undefined
    },
  })
  await Open.enableMemoryOpener()
  expect(mockRpc.invocations).toEqual([['Open.enableMemoryOpener']])
})

test('disableMemoryOpener', async () => {
  using mockRpc = OpenerWorker.registerMockRpc({
    'Open.disableMemoryOpener'() {
      return undefined
    },
  })
  await Open.disableMemoryOpener()
  expect(mockRpc.invocations).toEqual([['Open.disableMemoryOpener']])
})

test('shouldHaveUrl - string success', async () => {
  using mockRpc = OpenerWorker.registerMockRpc({
    'Open.readOpenedUrl'() {
      return 'https://example.com'
    },
  })
  await Open.shouldHaveUrl('https://example.com')
  expect(mockRpc.invocations).toEqual([['Open.readOpenedUrl']])
})

test('shouldHaveUrl - string error', async () => {
  using mockRpc = OpenerWorker.registerMockRpc({
    'Open.readOpenedUrl'() {
      return 'https://wrong.example.com'
    },
  })
  await expect(Open.shouldHaveUrl('https://example.com')).rejects.toThrow(
    'expected opened url to be "https://example.com" but was "https://wrong.example.com"',
  )
  expect(mockRpc.invocations).toEqual([['Open.readOpenedUrl']])
})

test('shouldHaveUrl - regex success', async () => {
  using mockRpc = OpenerWorker.registerMockRpc({
    'Open.readOpenedUrl'() {
      return 'https://example.com/path/123'
    },
  })
  await Open.shouldHaveUrl(/https:\/\/example\.com\/path\/\d+/)
  expect(mockRpc.invocations).toEqual([['Open.readOpenedUrl']])
})

test('shouldHaveUrl - regex error', async () => {
  using mockRpc = OpenerWorker.registerMockRpc({
    'Open.readOpenedUrl'() {
      return 'https://example.com/path/no-number'
    },
  })
  await expect(Open.shouldHaveUrl(/https:\/\/example\.com\/path\/\d+/)).rejects.toThrow(
    'expected opened url to be "/https:\\/\\/example\\.com\\/path\\/\\d+/" but was "https://example.com/path/no-number"',
  )
  expect(mockRpc.invocations).toEqual([['Open.readOpenedUrl']])
})
