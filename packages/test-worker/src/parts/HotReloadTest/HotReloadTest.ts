import type * as TestInfoCache from '../TestInfoCache/TestInfoCache.ts'
import { getHotReloadArgs } from '../GetHotReloadArgs/GetHotReloadArgs.ts'
import { doHotReload } from './DoHotReload.ts'

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
  const { assetDir, platform, shouldHotReload, url } = getHotReloadArgs({ latestItem: getLastTestInfoItem(), locationHref, time })
  if (!shouldHotReload) {
    return
  }
  await doHotReload(url, platform, assetDir)
}
