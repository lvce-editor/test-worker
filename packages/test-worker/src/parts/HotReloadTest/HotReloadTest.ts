import type * as TestInfoCache from '../TestInfoCache/TestInfoCache.ts'
import { getHotReloadArgs } from '../GetHotReloadArgs/GetHotReloadArgs.ts'
import { doHotReload } from './DoHotReload.ts'

export const hotReloadTest = async (lastItem: TestInfoCache.TestInfoItem | undefined, locationHref: string, time: number): Promise<void> => {
  const { assetDir, platform, shouldHotReload, url } = getHotReloadArgs(lastItem, locationHref, time)
  if (!shouldHotReload) {
    return
  }
  await doHotReload(url, platform, assetDir)
}
