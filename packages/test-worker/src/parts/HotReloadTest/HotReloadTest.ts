import type { TestInfoItem } from '../TestInfoCache/TestInfoItem.ts'
import { doHotReload } from '../DoHotReload/DoHotReload.ts'
import { getHotReloadArgs } from '../GetHotReloadArgs/GetHotReloadArgs.ts'

export const hotReloadTest = async (lastItem: TestInfoItem | undefined, locationHref: string, time: number): Promise<void> => {
  const { assetDir, platform, shouldHotReload, url } = getHotReloadArgs(lastItem, locationHref, time)
  if (!shouldHotReload) {
    return
  }
  await doHotReload(url, platform, assetDir)
}
