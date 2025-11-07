import { createUrlWithQueryParameter } from '../CreateUrlWithQueryParameter/CreateUrlWithQueryParameter.ts'
import { execute } from '../Test/Test.ts'
import * as TestInfoCache from '../TestInfoCache/TestInfoCache.ts'

export const hotReloadTest = async (): Promise<void> => {
  if (!TestInfoCache.hasItems()) {
    return
  }
  const last = TestInfoCache.last()
  const { platform, url, assetDir, inProgress } = last
  if (inProgress) {
    return
  }
  const withQueryParameter = createUrlWithQueryParameter(url)
  await execute(withQueryParameter, platform, assetDir)
}
