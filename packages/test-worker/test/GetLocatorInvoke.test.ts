import { expect, test } from '@jest/globals'
import * as GetLocatorInvoke from '../src/parts/GetLocatorInvoke/GetLocatorInvoke.ts'
import * as RendererProcess from '../src/parts/RendererProcess/RendererProcess.ts'
import * as WebViewState from '../src/parts/WebViewState/WebViewState.ts'

const invoke: () => void = (): void => {}

test('getLocatorInvoke: webView locator', (): void => {
  WebViewState.set('web', { invoke })
  const locator: any = { webViewId: 'web' }
  const result: any = GetLocatorInvoke.getLocatorInvoke(locator)
  expect(result).toBe(invoke)
})

test('getLocatorInvoke: default to RendererProcess', (): void => {
  const locator: any = {}
  const result: any = GetLocatorInvoke.getLocatorInvoke(locator)

  expect(result).toBe(RendererProcess.invoke)
})
