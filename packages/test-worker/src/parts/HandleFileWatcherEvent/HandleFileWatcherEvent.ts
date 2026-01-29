import { hotReloadTest } from '../HotReloadTest/HotReloadTest.ts'
import * as TestInfoCache from '../TestInfoCache/TestInfoCache.ts'

const clearConsole = (): void => {
  // eslint-disable-next-line no-console
  console.clear()
}

export const handleFileWatcherEvent = async (event: any): Promise<void> => {
  const locationHref = location.href
  const time = Date.now()
  const lastItem = TestInfoCache.hasItems() ? TestInfoCache.last() : undefined
  await hotReloadTest({
    clearConsole,
    getLastTestInfoItem: TestInfoCache.last,
    hastTestInfoItems: TestInfoCache.hasItems,
    locationHref,
    time,
  })
}
