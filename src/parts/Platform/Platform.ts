// @ts-nocheck

import * as PlatformType from '../PlatformType/PlatformType.ts'

interface PlatformState {
  platform: string
}

const getPlatform = (): string => {
  // @ts-expect-error
  if (typeof PLATFORM !== 'undefined') {
    // @ts-expect-error
    return PLATFORM
  }
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
    return 'test'
  }
  if (typeof name !== 'undefined' && name.endsWith('(Electron)')) {
    return PlatformType.Electron
  }
  return PlatformType.Remote
}

export const platform: string = getPlatform()
