import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as AutoFixState from '../AutoFixState/AutoFixState.ts'
import { createApi } from '../CreateApi/CreateApi.ts'
import * as ExecuteTest2 from '../ExecuteTest2/ExecuteTest2.ts'
import * as ExecuteTest from '../ExecuteTest/ExecuteTest.ts'
import { hotReloadEnabled } from '../HotReloadEnabled/HotReloadEnabled.ts'
import * as ImportTest from '../ImportTest/ImportTest.ts'
import { printTestError } from '../PrintTestError/PrintTestError.ts'
import * as TestFrameWork from '../TestFrameWork/TestFrameWork.ts'
import * as TestFrameWorkComponentUrl from '../TestFrameWorkComponentUrl/TestFrameWorkComponentUrl.ts'
import * as TestInfoCache from '../TestInfoCache/TestInfoCache.ts'
import * as TestState from '../TestState/TestState.ts'
import * as TestType from '../TestType/TestType.ts'
import * as Timestamp from '../Timestamp/Timestamp.ts'
import { watchForHotReload } from '../WatchForHotReload/WatchForHotReload.ts'

export interface ExecuteAllTest {
  readonly name: string
  readonly url: string
}

interface ExecuteAllTestResult {
  readonly end: number
  readonly error: string
  readonly name: string
  readonly start: number
  readonly status: string
}

const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }
  return String(error)
}

const getSkippedResult = (name: string): ExecuteAllTestResult => {
  const now = Timestamp.now()
  return {
    end: now,
    error: '',
    name,
    start: now,
    status: 'skip',
  }
}

const getMissingTestResult = (name: string): ExecuteAllTestResult => {
  const now = Timestamp.now()
  return {
    end: now,
    error: 'test function not found',
    name,
    start: now,
    status: TestType.Fail,
  }
}

const getImportErrorResult = (name: string, error: unknown): ExecuteAllTestResult => {
  const now = Timestamp.now()
  return {
    end: now,
    error: toErrorMessage(error),
    name,
    start: now,
    status: TestType.Fail,
  }
}

const getExecutedResult = async (name: string, test: any, globals: any): Promise<ExecuteAllTestResult> => {
  const result = await ExecuteTest2.executeTest2(name, test, globals, Timestamp.now)
  return {
    end: result.end,
    error: result.error ? toErrorMessage(result.error) : '',
    name,
    start: result.start,
    status: result.type,
  }
}

const executeAllTest = async (item: ExecuteAllTest, globals: any): Promise<ExecuteAllTestResult> => {
  try {
    const module = await ImportTest.importTest(item.url)
    const { mockRpc, skip, test } = module
    if (mockRpc) {
      TestState.setMockRpc(mockRpc)
    }
    if (skip) {
      return getSkippedResult(item.name)
    }
    if (!test) {
      return getMissingTestResult(item.name)
    }
    return getExecutedResult(item.name, test, globals)
  } catch (error) {
    return getImportErrorResult(item.name, error)
  }
}

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
  // 1. get script to import from renderer process (URL or from HTML)
  const scriptUrl = href
  TestFrameWorkComponentUrl.setUrl(scriptUrl) // TODO avoid side effect
  try {
    // 2. import that script
    const module = await ImportTest.importTest(scriptUrl)
    const { mockRpc, name, skip, test } = module
    if (mockRpc) {
      TestState.setMockRpc(mockRpc)
    }
    if (test) {
      if (skip) {
        await TestFrameWork.skipTest(name)
      } else {
        await ExecuteTest.executeTest(name, test, globals)
      }
    }
    // TODO maybe setup file watcher earlier, to not miss events?
  } catch (error) {
    AutoFixState.clear()
    await printTestError(error)
    await RendererWorker.invoke('TestFrameWork.showOverlay', TestType.Fail, 'red', `test failed: ${error}`)
    return
  } finally {
    TestInfoCache.push({
      assetDir,
      inProgress: false,
      platform,
      url: href,
    })
  }

  // TODO if file watcher was previously added, don't need to add one
  try {
    if (await hotReloadEnabled()) {
      await watchForHotReload(platform, href)
    }
  } catch {
    // ignore
  }
}

export const executeAll = async (tests: readonly ExecuteAllTest[], href: string, platform: number, assetDir: string): Promise<void> => {
  TestInfoCache.push({
    assetDir,
    inProgress: true,
    platform,
    url: href,
  })
  const globals = createApi(platform, assetDir)
  const results: ExecuteAllTestResult[] = []
  for (const test of tests) {
    const result = await executeAllTest(test, globals)
    results.push(result)
  }
  await RendererWorker.invoke('TestFrameWork.showTestResults', JSON.stringify(results))
  TestInfoCache.push({
    assetDir,
    inProgress: false,
    platform,
    url: href,
  })
}
