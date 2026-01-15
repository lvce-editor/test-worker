import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { hotReloadEnabled } from '../src/parts/HotReloadEnabled/HotReloadEnabled.ts'

test('hotReloadEnabled returns true when preference is truthy', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get'(key: string) {
      expect(key).toBe('E2eTest.hotReload')
      return 'true'
    },
  })
  const result = await hotReloadEnabled()
  expect(result).toBe(true)
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'E2eTest.hotReload']])
})

test('hotReloadEnabled returns false when preference is falsy', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get'(key: string) {
      expect(key).toBe('E2eTest.hotReload')
      return false
    },
  })
  const result = await hotReloadEnabled()
  expect(result).toBe(false)
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'E2eTest.hotReload']])
})

test('hotReloadEnabled returns false when preference is null', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get'(key: string) {
      expect(key).toBe('E2eTest.hotReload')
      return null
    },
  })
  const result = await hotReloadEnabled()
  expect(result).toBe(false)
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'E2eTest.hotReload']])
})

test('hotReloadEnabled returns false when preference is undefined', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get'(key: string) {
      expect(key).toBe('E2eTest.hotReload')
      return undefined
    },
  })
  const result = await hotReloadEnabled()
  expect(result).toBe(false)
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'E2eTest.hotReload']])
})

test('hotReloadEnabled returns false when preference is empty string', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get'(key: string) {
      expect(key).toBe('E2eTest.hotReload')
      return ''
    },
  })
  const result = await hotReloadEnabled()
  expect(result).toBe(false)
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'E2eTest.hotReload']])
})

test('hotReloadEnabled returns true when preference is number 1', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get'(key: string) {
      expect(key).toBe('E2eTest.hotReload')
      return 1
    },
  })
  const result = await hotReloadEnabled()
  expect(result).toBe(true)
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'E2eTest.hotReload']])
})
