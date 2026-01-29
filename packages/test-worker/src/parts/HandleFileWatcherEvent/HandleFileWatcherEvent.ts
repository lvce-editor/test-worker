import { hotReloadTest } from '../HotReloadTest/HotReloadTest.ts'
import * as TestInfoCache from '../TestInfoCache/TestInfoCache.ts'

const clearConsole = (): void => {
  // eslint-disable-next-line no-console
  console.clear()
}

export const handleFileWatcherEvent = async (event: any): Promise<void> => {
  const locationHref = location.href
  const time = Date.now()
  await hotReloadTest({
    clearConsole,
    locationHref,
    testInfoCache: {
      clear: TestInfoCache.clear,
      hasItems: TestInfoCache.hasItems,
      last: TestInfoCache.last,
      push: TestInfoCache.push,
    },
    time,
  })
}
