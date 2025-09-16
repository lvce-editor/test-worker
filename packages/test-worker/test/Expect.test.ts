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
    ['TestFrameWork.checkConditionError', 'toHaveText', locator, { text: 'World' }],
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

test('checkMultiElementCondition: error path builds ConditionErrors', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkMultiElementCondition'() {
      return { error: true }
    },
    'TestFrameWork.checkConditionError'() {
      return { wasFound: true, actual: 1 }
    },
  })

  const locator = createLocator('item')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toHaveCount(2)).rejects.toMatchObject({
    message: expect.stringContaining('expected item to have count 2 but was 1'),
  })

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkMultiElementCondition', locator, 'toHaveCount', { count: 2 }],
    ['TestFrameWork.checkConditionError', 'toHaveCount', locator],
  ])
})

test('toBeVisible: success path', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  const locator = createLocator('button')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toBeVisible()

  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkSingleElementCondition', locator, 'toBeVisible', {}]])
})

test('toContainText: success path', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toContainText('Hello World')

  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkSingleElementCondition', locator, 'toContainText', { text: 'Hello World' }]])
})

test('toContainText: error path', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return { error: true }
    },
    'TestFrameWork.checkConditionError'() {
      return { wasFound: true, actual: 'Hello' }
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toContainText('World')).rejects.toMatchObject({
    message: expect.stringContaining('expected selector div to contain text "World" but was "Hello"'),
  })

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator, 'toContainText', { text: 'World' }],
    ['TestFrameWork.checkConditionError', 'toContainText', locator, { text: 'World' }],
  ])
})

test('toHaveValue: success path', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  const locator = createLocator('input')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toHaveValue('test value')

  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkSingleElementCondition', locator, 'toHaveValue', { value: 'test value' }]])
})

test('toHaveValue: error path', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return { error: true }
    },
    'TestFrameWork.checkConditionError'() {
      return { wasFound: true, actual: 'different value' }
    },
  })

  const locator = createLocator('input')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toHaveValue('expected value')).rejects.toMatchObject({
    message: expect.stringContaining('expected selector input to have value expected value'),
  })

  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkSingleElementCondition', locator, 'toHaveValue', { value: 'expected value' }]])
})

test('toBeFocused: success path', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  const locator = createLocator('input')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toBeFocused()

  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkSingleElementCondition', locator, 'toBeFocused', undefined]])
})

test('toBeFocused: error path', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return { error: true }
    },
    'TestFrameWork.checkConditionError'() {
      return { wasFound: true, actual: false }
    },
  })

  const locator = createLocator('input')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toBeFocused()).rejects.toMatchObject({
    message: expect.stringContaining('expected input to be focused but active element is false'),
  })

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator, 'toBeFocused', undefined],
    ['TestFrameWork.checkConditionError', 'toBeFocused', locator, undefined],
  ])
})

test('toHaveCSS: success path', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toHaveCSS('color', 'red')

  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkSingleElementCondition', locator, 'toHaveCss', { key: 'color', value: 'red' }]])
})

test('toHaveCSS: error path', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return { error: true }
    },
    'TestFrameWork.checkConditionError'() {
      return { wasFound: true, actual: 'blue' }
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toHaveCSS('color', 'red')).rejects.toMatchObject({
    message: expect.stringContaining('expected div to have css color red but was blue'),
  })

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator, 'toHaveCss', { key: 'color', value: 'red' }],
    ['TestFrameWork.checkConditionError', 'toHaveCss', locator, { key: 'color', value: 'red' }],
  ])
})

test('toHaveAttribute: success path', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  const locator = createLocator('input')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toHaveAttribute('type', 'text')

  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkSingleElementCondition', locator, 'toHaveAttribute', { key: 'type', value: 'text' }]])
})

test('toHaveAttribute: error path', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return { error: true }
    },
    'TestFrameWork.checkConditionError'() {
      return { wasFound: true, actual: 'password' }
    },
  })

  const locator = createLocator('input')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toHaveAttribute('type', 'text')).rejects.toMatchObject({
    message: expect.stringContaining('expected input to have attribute type text but was password'),
  })

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator, 'toHaveAttribute', { key: 'type', value: 'text' }],
    ['TestFrameWork.checkConditionError', 'toHaveAttribute', locator, { key: 'type', value: 'text' }],
  ])
})

test('toHaveJSProperty: success path', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toHaveJSProperty('innerHTML', '<span>test</span>')

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator, 'toHaveJSProperty', { key: 'innerHTML', value: '<span>test</span>' }],
  ])
})

test('toHaveJSProperty: error path', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return { error: true }
    },
    'TestFrameWork.checkConditionError'() {
      return { wasFound: true, actual: '<div>different</div>' }
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toHaveJSProperty('innerHTML', '<span>test</span>')).rejects.toMatchObject({
    message: expect.stringContaining('expected div to have js property innerHTML <span>test</span> but was <div>different</div>'),
  })

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator, 'toHaveJSProperty', { key: 'innerHTML', value: '<span>test</span>' }],
    ['TestFrameWork.checkConditionError', 'toHaveJSProperty', locator, { key: 'innerHTML', value: '<span>test</span>' }],
  ])
})

test('toHaveClass: success path', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toHaveClass('active')

  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkSingleElementCondition', locator, 'toHaveClass', { className: 'active' }]])
})

test('toHaveClass: error path', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return { error: true }
    },
    'TestFrameWork.checkConditionError'() {
      return { wasFound: true, actual: 'inactive' }
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toHaveClass('active')).rejects.toMatchObject({
    message: expect.stringContaining('expected div to have class active'),
  })

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator, 'toHaveClass', { className: 'active' }],
    ['TestFrameWork.checkConditionError', 'toHaveClass', locator, { className: 'active' }],
  ])
})

test('toHaveId: success path', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toHaveId('my-element')

  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkSingleElementCondition', locator, 'toHaveId', { id: 'my-element' }]])
})

test('toHaveId: error path', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return { error: true }
    },
    'TestFrameWork.checkConditionError'() {
      return { wasFound: true, actual: 'different-id' }
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toHaveId('my-element')).rejects.toMatchObject({
    message: expect.stringContaining('expected div to have id my-element but was different-id'),
  })

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator, 'toHaveId', { id: 'my-element' }],
    ['TestFrameWork.checkConditionError', 'toHaveId', locator, { id: 'my-element' }],
  ])
})

test('toBeHidden: success path', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkMultiElementCondition'() {
      return {}
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toBeHidden()

  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkMultiElementCondition', locator, 'toBeHidden', {}]])
})

test('toBeHidden: error path', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkMultiElementCondition'() {
      return { error: true }
    },
    'TestFrameWork.checkConditionError'() {
      return { wasFound: true, actual: true }
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toBeHidden()).rejects.toMatchObject({
    message: expect.stringContaining('expected div to be hidden'),
  })

  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkMultiElementCondition', locator, 'toBeHidden', {}]])
})
