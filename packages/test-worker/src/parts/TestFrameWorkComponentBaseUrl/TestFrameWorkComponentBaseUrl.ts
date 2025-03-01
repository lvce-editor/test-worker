import * as AssetDir from '../AssetDir/AssetDir.ts'

export const getBaseUrl = (): string => {
  return `${location.origin}/${AssetDir.assetDir}`
}
