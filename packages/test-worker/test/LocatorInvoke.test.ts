import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as LocatorInvoke from '../src/parts/LocatorInvoke/LocatorInvoke.ts'
import * as WebViewState from '../src/parts/WebViewState/WebViewState.ts'

test('locatorInvoke: with WebViewState', async () => {
  const invoke = jest.fn<(...args: any[]) => Promise<any>>().mockResolvedValue('ok')
  const locator: any = { webViewId: 'web' }
  WebViewState.set('web', { invoke })

  const result = await LocatorInvoke.locatorInvoke(locator, 'click', 1)
  expect(result).toBe('ok')
  expect(invoke).toHaveBeenCalledWith('click', 1)
})

test('locatorInvoke: with RendererWorker', async () => {
  const mockInvoke = jest.fn<(...args: any[]) => Promise<any>>().mockResolvedValue('ok')
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)
  const locator: any = {}

  const result = await LocatorInvoke.locatorInvoke(locator, 'hover', 2)
  expect(result).toBe('ok')
  expect(mockInvoke).toHaveBeenCalledWith('hover', 2)
})

test('locatorInvoke: asserts', async () => {
  await expect(() => {
    // @ts-ignore
    LocatorInvoke.locatorInvoke(undefined, 'click')
  }).toThrow(/expected value to be of type object/i)

  await expect(() => {
    // @ts-ignore
    LocatorInvoke.locatorInvoke({}, 123)
  }).toThrow(/expected value to be of type string/i)
})
