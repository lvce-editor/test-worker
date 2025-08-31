import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ExpectMod from '../src/parts/Expect/Expect.ts'

const createLocator = (selector: string = 'button'): any => {
  return {
    _selector: selector,
    _nth: -1,
    _hasText: '',
  }
}

test('toHaveText: ok path', async () => {
  const mockInvoke = jest.fn<(...args: any[]) => Promise<any>>().mockResolvedValue({})
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  const locator = createLocator('button')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toHaveText('Hello')

  expect(mockInvoke).toHaveBeenCalledWith('TestFrameWork.checkSingleElementCondition', locator, 'toHaveText', { text: 'Hello' })
})

test('toHaveText: error path builds ConditionErrors', async () => {
  const mockInvoke = jest.fn<(...args: any[]) => Promise<any>>().mockResolvedValue({ error: true })
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  const locator = createLocator('button')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toHaveText('World')).rejects.toMatchObject({
    message: expect.stringContaining('expected selector button to have text "World"'),
  })
})

test('toHaveCount: validates number', async () => {
  const mockInvoke = jest.fn<(...args: any[]) => Promise<any>>().mockResolvedValue({})
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)
  const locator = createLocator('item')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toHaveCount(2)
  expect(mockInvoke).toHaveBeenCalledWith('TestFrameWork.checkMultiElementCondition', locator, 'toHaveCount', { count: 2 })
})

test('toBeVisible: negated throws guidance', async () => {
  const locator = createLocator('panel')
  const expectLocator = ExpectMod.expect(locator).not
  await expect(expectLocator.toBeVisible()).rejects.toThrow('use toBeHidden instead of not.toBeVisible')
})
