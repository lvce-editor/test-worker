import { expect, jest, test } from '@jest/globals'

jest.unstable_mockModule('../src/parts/PlatformPaths/PlatformPaths.ts', () => ({
  getNodePath: jest.fn(),
}))
jest.unstable_mockModule('../src/parts/IsFirefox/IsFirefox.ts', () => ({
  getIsFirefox: jest.fn(() => true),
}))

const PlatformPaths = await import('../src/parts/PlatformPaths/PlatformPaths.ts')
const IsFirefox = await import('../src/parts/IsFirefox/IsFirefox.ts')
const Platform = await import('../src/parts/TestFrameWorkComponentPlatform/TestFrameWorkComponentPlatform.ts')

test('getNodePath delegates to PlatformPaths.getNodePath', async () => {
  ;(PlatformPaths.getNodePath as any).mockResolvedValue('/usr/bin/node')
  const nodePath = await Platform.getNodePath()
  expect(PlatformPaths.getNodePath).toHaveBeenCalledTimes(1)
  expect(nodePath).toBe('/usr/bin/node')
})

test('isFirefox returns value from IsFirefox.getIsFirefox', () => {
  expect(Platform.isFirefox()).toBe(true)
  expect(IsFirefox.getIsFirefox).toHaveBeenCalledTimes(1)
})
