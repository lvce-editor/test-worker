import { hotReloadTest } from '../HotReloadTest/HotReloadTest.ts'
import * as TestInfoCache from '../TestInfoCache/TestInfoCache.ts'

export const handleFileWatcherEvent = async (event: any): Promise<void> => {
  const locationHref = location.href
  const time = Date.now()
  const lastItem = TestInfoCache.hasItems() ? TestInfoCache.last() : undefined
  await hotReloadTest(lastItem, locationHref, time)
}
