import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as WebViewState from '../src/parts/WebViewState/WebViewState.ts'

const invoke: jest.Mock = jest.fn()
const mockRpc = MockRpc.create({ commandMap: {}, invoke })

await jest.unstable_mockModule('../src/parts/CreatePortIpc/CreatePortIpc.ts', () => ({
	createPortIpc: jest.fn().mockResolvedValue(mockRpc as any),
}))

const WebView = await import('../src/parts/TestFrameWorkComponentWebView/TestFrameWorkComponentWebView.ts')

test('fromId: sets WebViewState and returns locator with webViewId', async () => {
	const webViewId = 'webview-1'
	const api: any = await WebView.fromId(webViewId)
	expect(WebViewState.get(webViewId)).toBe(mockRpc)
	const locator = api.locator('button', { a: 1 })
	expect(locator.webViewId).toBe(webViewId)
})
