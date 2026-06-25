import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Platform from '../src/parts/TestFrameWorkComponentPlatform/TestFrameWorkComponentPlatform.ts'

const mockNavigator = (userAgent: string, userAgentData?: any): void => {
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: {
      userAgent,
      userAgentData,
    },
    writable: true,
  })
}

const clearNavigator = (): void => {
  // @ts-expect-error
  delete globalThis.navigator
}

test('getNodePath delegates to PlatformPaths.getNodePath', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Platform.getNodePath'() {
      return '/usr/bin/node'
    },
  })

  const nodePath = await Platform.getNodePath()
  expect(nodePath).toBe('/usr/bin/node')
  expect(mockRpc.invocations).toEqual([['Platform.getNodePath']])
})

test('isFirefox delegates to platform detection', () => {
  mockNavigator('Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0')

  const result = Platform.isFirefox()

  expect(result).toBe(true)

  clearNavigator()
})

test('isFirefox returns false for non-firefox user agent', () => {
  mockNavigator('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36')

  const result = Platform.isFirefox()

  expect(result).toBe(false)

  clearNavigator()
})
