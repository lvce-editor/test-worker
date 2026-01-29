import type * as TestInfoCache from '../TestInfoCache/TestInfoCache.ts'
import { createUrlWithQueryParameter } from '../CreateUrlWithQueryParameter/CreateUrlWithQueryParameter.ts'

export interface HotReloadArgs {
  readonly assetDir: string
  readonly platform: number
  readonly shouldHotReload: boolean
  readonly url: string
}

export const getHotReloadArgs = (latestItem: TestInfoCache.TestInfoItem | undefined, locationHref: string, time: number): HotReloadArgs => {
  if (!latestItem) {
    return {
      assetDir: '',
      platform: 0,
      shouldHotReload: false,
      url: '',
    }
  }
  const { assetDir, inProgress, platform, url } = latestItem
  if (inProgress) {
    return {
      assetDir: '',
      platform: 0,
      shouldHotReload: false,
      url: '',
    }
  }
  const withQueryParameter = createUrlWithQueryParameter(url, locationHref, time)
  return {
    assetDir,
    platform,
    shouldHotReload: true,
    url: withQueryParameter,
  }
}
