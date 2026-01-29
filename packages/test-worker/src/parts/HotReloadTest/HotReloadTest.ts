import type * as TestInfoCache from '../TestInfoCache/TestInfoCache.ts'
import { createUrlWithQueryParameter } from '../CreateUrlWithQueryParameter/CreateUrlWithQueryParameter.ts'
import { execute } from '../Test/Test.ts'

export interface HotReloadTestOptions {
  readonly clearConsole: () => void
  readonly locationHref: string
  readonly testInfoCache: TestInfoCache.ITestInfoCache
  readonly time: number
}

export const hotReloadTest = async ({ clearConsole, locationHref, testInfoCache, time }: HotReloadTestOptions): Promise<void> => {
  if (!testInfoCache.hasItems()) {
    return
  }
  const last = testInfoCache.last()
  const { assetDir, inProgress, platform, url } = last
  if (inProgress) {
    return
  }
  const withQueryParameter = createUrlWithQueryParameter(url, locationHref, time)
  clearConsole()
  await execute(withQueryParameter, platform, assetDir)
}
