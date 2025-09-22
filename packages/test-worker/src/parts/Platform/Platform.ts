// @ts-nocheck

import { PlatformType } from '@lvce-editor/constants'

const getPlatform = (): number => {
  // @ts-expect-error
  if (typeof PLATFORM !== 'undefined') {
    // @ts-expect-error
    return PLATFORM
  }
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
    return 'test'
  }
  // Check if running in web environment
  if (globalThis.window !== undefined && typeof document !== 'undefined') {
    return PlatformType.Web
  }
  // TODO find a better way to pass runtime environment
  if (typeof name !== 'undefined' && name.endsWith('(Electron)')) {
    return PlatformType.Electron
  }
  return PlatformType.Remote
}

export const platform = getPlatform() // TODO tree-shake this out in production
