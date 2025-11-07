import { hotReloadTest } from '../HotReloadTest/HotReloadTest.ts'

export const handleFileWatcherEvent = async (event: any): Promise<void> => {
  await hotReloadTest()
}
