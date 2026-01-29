import type * as TestInfoCache from '../TestInfoCache/TestInfoCache.ts'
import { createUrlWithQueryParameter } from '../CreateUrlWithQueryParameter/CreateUrlWithQueryParameter.ts'
import { execute } from '../Test/Test.ts'

export interface HotReloadTestOptions {
  readonly clearConsole: () => void
  readonly getLastTestInfoItem: () => TestInfoCache.TestInfoItem
  readonly hastTestInfoItems: () => boolean
  readonly locationHref: string
  readonly time: number
}

export const hotReloadTest = async ({
  clearConsole,
  getLastTestInfoItem,
  hastTestInfoItems,
  locationHref,
  time,
}: HotReloadTestOptions): Promise<void> => {
  if (!hastTestInfoItems()) {
    return
  }
  const last = getLastTestInfoItem()
  const { assetDir, inProgress, platform, url } = last
  if (inProgress) {
    return
  }
  const withQueryParameter = createUrlWithQueryParameter(url, locationHref, time)
  clearConsole()
  await execute(withQueryParameter, platform, assetDir)
}
