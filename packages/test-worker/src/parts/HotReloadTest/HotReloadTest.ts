import type * as TestInfoCache from '../TestInfoCache/TestInfoCache.ts'
import { getHotReloadArgs } from '../GetHotReloadArgs/GetHotReloadArgs.ts'
import { execute } from '../Test/Test.ts'

export interface HotReloadTestOptions {
  readonly clearConsole: () => void
  readonly getLastTestInfoItem: () => TestInfoCache.TestInfoItem
  readonly hastTestInfoItems: () => boolean
  readonly locationHref: string
  readonly time: number
}

<<<<<<< HEAD
=======
const doHotReload = async (url: string, platform: number, assetDir: string): Promise<void> => {
  // eslint-disable-next-line no-console
  console.clear()
  await execute(url, platform, assetDir)
}

>>>>>>> origin/main
export const hotReloadTest = async ({
  clearConsole,
  getLastTestInfoItem,
  hastTestInfoItems,
  locationHref,
  time,
}: HotReloadTestOptions): Promise<void> => {
<<<<<<< HEAD
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
=======
  const { assetDir, platform, shouldHotReload, url } = getHotReloadArgs({ latestItem: getLastTestInfoItem(), locationHref, time })
  if (!shouldHotReload) {
    return
  }
  await doHotReload(url, platform, assetDir)
>>>>>>> origin/main
}
