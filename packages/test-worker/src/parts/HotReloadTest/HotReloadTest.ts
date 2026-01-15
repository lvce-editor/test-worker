import { clearConsole } from '../ClearConsole/ClearConsole.ts'
import { createUrlWithQueryParameter } from '../CreateUrlWithQueryParameter/CreateUrlWithQueryParameter.ts'
import { execute } from '../Test/Test.ts'
import * as TestInfoCache from '../TestInfoCache/TestInfoCache.ts'

export const hotReloadTest = async (locationHref: string): Promise<void> => {
  if (!TestInfoCache.hasItems()) {
    return
  }
  const last = TestInfoCache.last()
  const { assetDir, inProgress, platform, url } = last
  if (inProgress) {
    return
  }
  const withQueryParameter = createUrlWithQueryParameter(url, locationHref)
  clearConsole()
  await execute(withQueryParameter, platform, assetDir)
}
