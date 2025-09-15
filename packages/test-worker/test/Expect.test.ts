import { expect, test } from '@jest/globals'
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
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  const locator = createLocator('button')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toHaveText('Hello')

  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkSingleElementCondition', locator, 'toHaveText', { text: 'Hello' }]])
})

test('toHaveText: error path builds ConditionErrors', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return { error: true }
    },
    'TestFrameWork.checkConditionError'() {
      return { wasFound: true, actual: 'Hello' }
    },
  })

  const locator = createLocator('button')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toHaveText('World')).rejects.toMatchObject({
    message: expect.stringContaining('expected selector button to have text "World"'),
  })

  // Verify the RPC was called
  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator, 'toHaveText', { text: 'World' }],
    ['TestFrameWork.checkConditionError', 'toHaveText', locator, { text: 'World' }]
  ])
})

test('toHaveCount: validates number', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkMultiElementCondition'() {
      return {}
    },
  })
  const locator = createLocator('item')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toHaveCount(2)
  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkMultiElementCondition', locator, 'toHaveCount', { count: 2 }]])
})

test('toBeVisible: negated throws guidance', async () => {
  const locator = createLocator('panel')
  const expectLocator = ExpectMod.expect(locator).not
  await expect(expectLocator.toBeVisible()).rejects.toThrow('use toBeHidden instead of not.toBeVisible')
})
