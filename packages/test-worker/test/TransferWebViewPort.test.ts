import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as TransferWebViewPort from '../src/parts/TransferWebViewPort/TransferWebViewPort.js'

test('transferWebViewPort transfers port successfully', async () => {
  const webViewId = 'test-webview-123'
  const mockInfo = {
    origin: 'https://example.com',
    title: 'Test WebView',
    uid: 12_345,
  }

  const mockPort = new MessageChannel().port1

  using mockRpc = RendererWorker.registerMockRpc({
    async 'WebView.getWebViewInfo2'(id: string): Promise<any> {
      expect(id).toBe(webViewId)
      return mockInfo
    },
    async 'WebView.setPort'(uid: number, port: MessagePort, origin: string, portType: string): Promise<void> {
      expect(uid).toBe(mockInfo.uid)
      expect(port).toBe(mockPort)
      expect(origin).toBe(mockInfo.origin)
      expect(portType).toBe('test')
    },
  })

  await TransferWebViewPort.transferWebViewPort(webViewId, mockPort)

  expect(mockRpc.invocations).toEqual([
    ['WebView.getWebViewInfo2', webViewId],
    ['WebView.setPort', mockInfo.uid, mockPort, mockInfo.origin, 'test'],
  ])
})

test('transferWebViewPort handles different webViewIds', async () => {
  const testCases = [
    { origin: 'https://test1.com', uid: 100, webViewId: 'webview-1' },
    { origin: 'https://test2.com', uid: 200, webViewId: 'webview-2' },
    { origin: 'https://test3.com', uid: 300, webViewId: 'webview-3' },
  ]

  for (const testCase of testCases) {
    const mockInfo = {
      origin: testCase.origin,
      title: `WebView ${testCase.webViewId}`,
      uid: testCase.uid,
    }

    const mockPort = new MessageChannel().port1

    using mockRpc = RendererWorker.registerMockRpc({
      async 'WebView.getWebViewInfo2'(id: string): Promise<any> {
        expect(id).toBe(testCase.webViewId)
        return mockInfo
      },
      async 'WebView.setPort'(uid: number, port: MessagePort, origin: string, portType: string): Promise<void> {
        expect(uid).toBe(testCase.uid)
        expect(port).toBe(mockPort)
        expect(origin).toBe(testCase.origin)
        expect(portType).toBe('test')
      },
    })

    await TransferWebViewPort.transferWebViewPort(testCase.webViewId, mockPort)

    expect(mockRpc.invocations).toEqual([
      ['WebView.getWebViewInfo2', testCase.webViewId],
      ['WebView.setPort', testCase.uid, mockPort, testCase.origin, 'test'],
    ])
  }
})
