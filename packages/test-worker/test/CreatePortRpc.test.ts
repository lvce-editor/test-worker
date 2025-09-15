import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CreatePortRpc from '../src/parts/CreatePortRpc/CreatePortRpc.ts'

test('createPortRpc: creates RPC successfully with ready message', async (): Promise<any> => {
  const webViewId = 'test-webview-123'
  const mockWebViewInfo = {
    uid: 12_345,
    origin: 'https://example.com',
    title: 'Test WebView',
  }

  const disposables: Array<() => Promise<void>> = []

  // Mock RendererWorker for GetWebViewInfo and SetWebViewPort
  const mockRpc = RendererWorker.registerMockRpc({
    async 'WebView.getWebViewInfo2'(webViewId: string): Promise<any> {
      return mockWebViewInfo
    },
    async 'WebView.setPort'(uid: number, port: MessagePort, origin: string, portType: string): Promise<void> {
      // Add port to disposables
      disposables.push(async () => port.close())
      // Simulate sending ready message after port is set
      setTimeout(() => {
        port.postMessage('ready')
      }, 0)
    },
  })

  const result = await CreatePortRpc.createPortRpc(webViewId)

  expect(result).toBeDefined()
  expect(mockRpc.invocations).toEqual([
    ['WebView.getWebViewInfo2', webViewId],
    ['WebView.setPort', mockWebViewInfo.uid, expect.any(MessagePort), mockWebViewInfo.origin, 'test'],
  ])

  // Add result to disposables and dispose all
  disposables.push(async () => await result.dispose())
  for (const dispose of disposables) {
    await dispose()
  }
})

test('createPortRpc: throws error when first message is not ready', async (): Promise<void> => {
  const webViewId = 'test-webview-456'
  const mockWebViewInfo = {
    uid: 67_890,
    origin: 'https://example.com',
    title: 'Test WebView 2',
  }

  const disposables: Array<() => Promise<void>> = []

  const mockRpc = RendererWorker.registerMockRpc({
    async 'WebView.getWebViewInfo2'(webViewId: string): Promise<any> {
      return mockWebViewInfo
    },
    async 'WebView.setPort'(uid: number, port: MessagePort, origin: string, portType: string): Promise<void> {
      // Add port to disposables
      disposables.push(async () => port.close())
      // Send wrong message instead of 'ready'
      setTimeout(() => {
        port.postMessage('not-ready')
      }, 0)
    },
  })

  await expect(CreatePortRpc.createPortRpc(webViewId)).rejects.toThrow('unexpected first message')
  expect(mockRpc.invocations).toEqual([
    ['WebView.getWebViewInfo2', webViewId],
    ['WebView.setPort', mockWebViewInfo.uid, expect.any(MessagePort), mockWebViewInfo.origin, 'test'],
  ])

  // Dispose all disposables
  for (const dispose of disposables) {
    await dispose()
  }
})

test.skip('createPortRpc: propagates error from GetWebViewInfo', async (): Promise<void> => {
  const webViewId = 'non-existent-webview'

  const mockRpc = RendererWorker.registerMockRpc({
    'WebView.getWebViewInfo2'(webViewId: string): Promise<any> {
      return Promise.reject(new Error('WebView not found'))
    },
  })

  await expect(CreatePortRpc.createPortRpc(webViewId)).rejects.toThrow('WebView not found')
  expect(mockRpc.invocations).toEqual([['WebView.getWebViewInfo2', webViewId]])
})

test('createPortRpc: propagates error from SetWebViewPort', async (): Promise<void> => {
  const webViewId = 'test-webview-error'
  const mockWebViewInfo = {
    uid: 99_999,
    origin: 'https://example.com',
    title: 'Error WebView',
  }

  const disposables: Array<() => Promise<void>> = []

  const mockRpc = RendererWorker.registerMockRpc({
    async 'WebView.getWebViewInfo2'(webViewId: string): Promise<any> {
      return mockWebViewInfo
    },
    'WebView.setPort'(uid: number, port: MessagePort, origin: string, portType: string): Promise<void> {
      // Add port to disposables
      disposables.push(async () => port.close())
      return Promise.reject(new Error('Failed to set port'))
    },
  })

  await expect(CreatePortRpc.createPortRpc(webViewId)).rejects.toThrow('Failed to set port')
  expect(mockRpc.invocations).toEqual([
    ['WebView.getWebViewInfo2', webViewId],
    ['WebView.setPort', mockWebViewInfo.uid, expect.any(MessagePort), mockWebViewInfo.origin, 'test'],
  ])

  // Dispose all disposables
  for (const dispose of disposables) {
    await dispose()
  }
})

test('createPortRpc: uses correct port type', async (): Promise<any> => {
  const webViewId = 'test-webview-port-type'
  const mockWebViewInfo = {
    uid: 11_111,
    origin: 'https://example.com',
    title: 'Port Type Test',
  }

  const disposables: Array<() => Promise<void>> = []

  const mockRpc = RendererWorker.registerMockRpc({
    async 'WebView.getWebViewInfo2'(webViewId: string): Promise<any> {
      return mockWebViewInfo
    },
    async 'WebView.setPort'(uid: number, port: MessagePort, origin: string, portType: string): Promise<void> {
      // Add port to disposables
      disposables.push(async () => port.close())
      expect(portType).toBe('test')
      setTimeout(() => {
        port.postMessage('ready')
      }, 0)
    },
  })

  const result: any = await CreatePortRpc.createPortRpc(webViewId)

  expect(result).toBeDefined()
  expect(typeof result).toBe('object')
  expect(mockRpc.invocations).toEqual([
    ['WebView.getWebViewInfo2', webViewId],
    ['WebView.setPort', mockWebViewInfo.uid, expect.any(MessagePort), mockWebViewInfo.origin, 'test'],
  ])

  // Add result to disposables and dispose all
  disposables.push(async () => await result.dispose())
  for (const dispose of disposables) {
    await dispose()
  }
})

test('createPortRpc: handles different webViewId values', async (): Promise<any> => {
  const testCases = [
    { webViewId: 'simple-id', uid: 100, origin: 'https://example.com' },
    { webViewId: 'complex-id-123', uid: 200, origin: 'https://example.com' },
    { webViewId: 'special-chars-!@#', uid: 300, origin: 'https://example.com' },
  ]

  for (const testCase of testCases) {
    const mockWebViewInfo = {
      uid: testCase.uid,
      origin: testCase.origin,
      title: `WebView ${testCase.webViewId}`,
    }

    const disposables: Array<() => Promise<void>> = []

    const mockRpc = RendererWorker.registerMockRpc({
      async 'WebView.getWebViewInfo2'(webViewId: string): Promise<any> {
        return mockWebViewInfo
      },
      async 'WebView.setPort'(uid: number, port: MessagePort, origin: string, portType: string): Promise<void> {
        // Add port to disposables
        disposables.push(async () => port.close())
        setTimeout(() => {
          port.postMessage('ready')
        }, 0)
      },
    })

    const result: any = await CreatePortRpc.createPortRpc(testCase.webViewId)

    expect(result).toBeDefined()
    expect(typeof result).toBe('object')
    expect(mockRpc.invocations).toEqual([
      ['WebView.getWebViewInfo2', testCase.webViewId],
      ['WebView.setPort', testCase.uid, expect.any(MessagePort), testCase.origin, 'test'],
    ])

    // Add result to disposables and dispose all
    disposables.push(async () => await result.dispose())
    for (const dispose of disposables) {
      await dispose()
    }

    // Allow time for cleanup
    await new Promise((resolve) => setTimeout(resolve, 10))
  }
})
