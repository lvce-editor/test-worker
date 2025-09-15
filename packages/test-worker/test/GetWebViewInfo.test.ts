import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetWebViewInfo from '../src/parts/GetWebViewInfo/GetWebViewInfo.ts'

test('getWebViewInfo: calls RendererWorker.invoke with correct method and webViewId', async (): Promise<void> => {
  const mockWebViewInfo = {
    uid: 'test-uid-123',
    origin: 'https://example.com',
    title: 'Test WebView'
  }

  const mockRpc = RendererWorker.registerMockRpc({
    async 'WebView.getWebViewInfo2'(webViewId: string): Promise<any> {
      return mockWebViewInfo
    },
  })

  const result: any = await GetWebViewInfo.getWebViewInfo('test-webview-id')

  expect(result).toEqual(mockWebViewInfo)
  expect(mockRpc.invocations).toEqual([
    ['WebView.getWebViewInfo2', 'test-webview-id']
  ])
})

test('getWebViewInfo: handles different webViewId values', async (): Promise<void> => {
  const mockWebViewInfo = {
    uid: 'different-uid-456',
    origin: 'https://test.com',
    title: 'Different WebView'
  }

  const mockRpc = RendererWorker.registerMockRpc({
    async 'WebView.getWebViewInfo2'(webViewId: string): Promise<any> {
      return mockWebViewInfo
    },
  })

  const result: any = await GetWebViewInfo.getWebViewInfo('different-webview-id')

  expect(result).toEqual(mockWebViewInfo)
  expect(mockRpc.invocations).toEqual([
    ['WebView.getWebViewInfo2', 'different-webview-id']
  ])
})

test('getWebViewInfo: propagates errors from RendererWorker.invoke', async (): Promise<void> => {
  const mockRpc = RendererWorker.registerMockRpc({
    'WebView.getWebViewInfo2'(webViewId: string): Promise<any> {
      return Promise.reject(new Error('WebView not found'))
    },
  })

  await expect(GetWebViewInfo.getWebViewInfo('non-existent-id')).rejects.toThrow('WebView not found')
  expect(mockRpc.invocations).toEqual([
    ['WebView.getWebViewInfo2', 'non-existent-id']
  ])
})
