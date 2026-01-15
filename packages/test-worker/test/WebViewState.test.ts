import { expect, test } from '@jest/globals'
import * as WebViewState from '../src/parts/WebViewState/WebViewState.js'

test('set and get webView', () => {
  const webViewId = 'test-webview-123'
  const mockWebView = { origin: 'https://example.com', uid: 12_345 }

  // Initially should be undefined
  expect(WebViewState.get(webViewId)).toBeUndefined()

  // Set the webView
  WebViewState.set(webViewId, mockWebView)

  // Should return the set webView
  expect(WebViewState.get(webViewId)).toBe(mockWebView)
})

test('set overwrites existing webView', () => {
  const webViewId = 'test-webview-456'
  const originalWebView = { origin: 'https://original.com', uid: 111 }
  const newWebView = { origin: 'https://new.com', uid: 222 }

  // Set original webView
  WebViewState.set(webViewId, originalWebView)
  expect(WebViewState.get(webViewId)).toBe(originalWebView)

  // Overwrite with new webView
  WebViewState.set(webViewId, newWebView)
  expect(WebViewState.get(webViewId)).toBe(newWebView)
  expect(WebViewState.get(webViewId)).not.toBe(originalWebView)
})

test('get returns undefined for non-existent webView', () => {
  const nonExistentId = 'non-existent-webview'

  expect(WebViewState.get(nonExistentId)).toBeUndefined()
})

test('multiple webViews can be stored independently', () => {
  const webView1Id = 'webview-1'
  const webView2Id = 'webview-2'
  const webView3Id = 'webview-3'

  const mockWebView1 = { origin: 'https://test1.com', uid: 1 }
  const mockWebView2 = { origin: 'https://test2.com', uid: 2 }
  const mockWebView3 = { origin: 'https://test3.com', uid: 3 }

  // Set multiple webViews
  WebViewState.set(webView1Id, mockWebView1)
  WebViewState.set(webView2Id, mockWebView2)
  WebViewState.set(webView3Id, mockWebView3)

  // Each should return its correct value
  expect(WebViewState.get(webView1Id)).toBe(mockWebView1)
  expect(WebViewState.get(webView2Id)).toBe(mockWebView2)
  expect(WebViewState.get(webView3Id)).toBe(mockWebView3)
})

test('webView state persistence across operations', () => {
  const webViewId = 'persistent-webview'
  const mockWebView = { origin: 'https://persistent.com', uid: 999 }

  // Set webView
  WebViewState.set(webViewId, mockWebView)

  // Multiple gets should return the same reference
  const firstGet = WebViewState.get(webViewId)
  const secondGet = WebViewState.get(webViewId)
  const thirdGet = WebViewState.get(webViewId)

  expect(firstGet).toBe(mockWebView)
  expect(secondGet).toBe(mockWebView)
  expect(thirdGet).toBe(mockWebView)
  expect(firstGet).toBe(secondGet)
  expect(secondGet).toBe(thirdGet)
})
