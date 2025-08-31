import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as WebViewState from '../src/parts/WebViewState/WebViewState.ts'
import * as GetLocatorInvoke from '../src/parts/GetLocatorInvoke/GetLocatorInvoke.ts'

test('getLocatorInvoke: webView locator', () => {
  const invoke = () => {}
  WebViewState.set('web', { invoke })
  const locator: any = { webViewId: 'web' }
  const result: any = GetLocatorInvoke.getLocatorInvoke(locator)
  expect(result).toBe(invoke)
})

test('getLocatorInvoke: default to RendererWorker', () => {
  const locator: any = {}
  const result: any = GetLocatorInvoke.getLocatorInvoke(locator)
  // @ts-ignore
  expect(result).toBe(RendererWorker.invoke)
})
