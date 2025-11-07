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
  await execute(url, platform, assetDir)
}
