import { hotReloadTest } from '../HotReloadTest/HotReloadTest.ts'

export const handleFileWatcherEvent = async (event: any): Promise<void> => {
  const locationHref = location.href
  const time = Date.now()
  await hotReloadTest(locationHref, time)
}
