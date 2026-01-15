import { createApi } from '../CreateApi/CreateApi.ts'
import * as ExecuteTest from '../ExecuteTest/ExecuteTest.ts'
import { hotReloadEnabled } from '../HotReloadEnabled/HotReloadEnabled.ts'
import * as ImportTest from '../ImportTest/ImportTest.ts'
import * as TestFrameWork from '../TestFrameWork/TestFrameWork.ts'
import * as TestFrameWorkComponentUrl from '../TestFrameWorkComponentUrl/TestFrameWorkComponentUrl.ts'
import * as TestInfoCache from '../TestInfoCache/TestInfoCache.ts'
import * as TestState from '../TestState/TestState.ts'
import { watchForHotReload } from '../WatchForHotReload/WatchForHotReload.ts'

// TODO move this into three steps:
// 1. import test module
// 2. execute test
// 3. print out results
export const execute = async (href: string, platform: number, assetDir: string): Promise<void> => {
  TestInfoCache.push({
    assetDir,
    inProgress: true,
    platform,
    url: href,
  })
  const globals = createApi(platform, assetDir)
  // TODO
  // 0. wait for page to be ready
  // 1. get script to import from renderer process (url or from html)
  const scriptUrl = href
  TestFrameWorkComponentUrl.setUrl(scriptUrl) // TODO avoid side effect
  // 2. import that script
  const module = await ImportTest.importTest(scriptUrl)
  if (module.mockRpc) {
    TestState.setMockRpc(module.mockRpc)
  }
  if (module.test) {
    if (module.skip) {
      await TestFrameWork.skipTest(module.name)
    } else {
      await ExecuteTest.executeTest(module.name, module.test, globals)
    }
  }
  // TODO maybe setup file watcher earlier, to not miss events?

  TestInfoCache.push({
    assetDir,
    inProgress: false,
    platform,
    url: href,
  })
  // TODO if file watcher was previously added, don't need to add one
  try {
    if (await hotReloadEnabled()) {
      await watchForHotReload(platform, href)
    }
  } catch {
    // ignore
  }
}
