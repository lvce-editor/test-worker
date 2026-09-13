import type { HotReloadArgs } from '../HotReloadArgs/HotReloadArgs.ts'
import type { TestInfoItem } from '../TestInfoCache/TestInfoItem.ts'
import { createUrlWithQueryParameter } from '../CreateUrlWithQueryParameter/CreateUrlWithQueryParameter.ts'
import { emptyHotReloadArgs } from '../EmptyHotReloadArgs/EmptyHotReloadArgs.ts'

export const getHotReloadArgs = (latestItem: TestInfoItem | undefined, locationHref: string, time: number): HotReloadArgs => {
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
