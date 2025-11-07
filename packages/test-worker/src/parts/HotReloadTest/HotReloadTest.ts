import { execute } from '../TestFrameWorkComponentCommand/TestFrameWorkComponentCommand.ts'
import * as TestInfoCache from '../TestInfoCache/TestInfoCache.ts'

export const hotReloadTest = async (): Promise<void> => {
  if (!TestInfoCache.hasItems()) {
    return
  }
  const last = TestInfoCache.last()
  const { platform, url, assetDir } = last
  await execute(url, platform, assetDir)
}
