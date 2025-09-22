import { PlatformType } from '@lvce-editor/constants'
import * as Platform from '../Platform/Platform.ts'

const getAssetDir = (): string => {
  // @ts-expect-error
  if (typeof ASSET_DIR !== 'undefined') {
    // @ts-expect-error
    return ASSET_DIR
  }
  if (Platform.platform === PlatformType.Electron) {
    return '../../../../..'
  }
  return ''
}

export const assetDir = getAssetDir()
