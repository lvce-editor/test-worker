import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as LocatorInvoke from '../src/parts/LocatorInvoke/LocatorInvoke.ts'
import * as WebViewState from '../src/parts/WebViewState/WebViewState.ts'

test('locatorInvoke: with WebViewState', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.performAction'() {
      return 'ok'
    },
  })
  const locator: any = { webViewId: 'web' }
  WebViewState.set('web', { invoke: mockRpc.invoke })

  const result = await LocatorInvoke.locatorInvoke(locator, 'TestFrameWork.performAction', locator, 'click', 1)
  expect(result).toBe('ok')
  expect(mockRpc.invocations).toEqual([['TestFrameWork.performAction', locator, 'click', 1]])
})

test('locatorInvoke: with RendererWorker', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.performAction'() {
      return 'ok'
    },
  })
  const locator: any = {}

  const result = await LocatorInvoke.locatorInvoke(locator, 'TestFrameWork.performAction', locator, 'hover', 2)
  expect(result).toBe('ok')
  expect(mockRpc.invocations).toEqual([['TestFrameWork.performAction', locator, 'hover', 2]])
})

test('locatorInvoke: asserts', async () => {
  // object assertion
  await expect(LocatorInvoke.locatorInvoke(undefined, 'click')).rejects.toThrow(/expected value to be of type object/i)

  // string assertion
  // @ts-ignore
  await expect(LocatorInvoke.locatorInvoke({}, 123)).rejects.toThrow(/expected value to be of type string/i)
})
