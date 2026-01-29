import type { HotReloadArgs } from '../HotReloadArgs/HotReloadArgs.ts'
import type * as TestInfoCache from '../TestInfoCache/TestInfoCache.ts'
import { createUrlWithQueryParameter } from '../CreateUrlWithQueryParameter/CreateUrlWithQueryParameter.ts'

const emptyHotReloadArgs: HotReloadArgs = {
  assetDir: '',
  platform: 0,
  shouldHotReload: false,
  url: '',
}

export const getHotReloadArgs = (latestItem: TestInfoCache.TestInfoItem | undefined, locationHref: string, time: number): HotReloadArgs => {
  if (!latestItem) {
    return emptyHotReloadArgs
  }
  const { assetDir, inProgress, platform, url } = latestItem
  if (inProgress) {
    return emptyHotReloadArgs
  }
  const withQueryParameter = createUrlWithQueryParameter(url, locationHref, time)
  return {
    assetDir,
    platform,
    shouldHotReload: true,
    url: withQueryParameter,
  }
}
