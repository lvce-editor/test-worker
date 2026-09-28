import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ILocator } from '../src/parts/ILocator/ILocator.ts'
import * as ConditionType from '../src/parts/ConditionType/ConditionType.ts'
import { createLocator as createRealLocator } from '../src/parts/CreateLocator/CreateLocator.ts'
import * as ExpectMod from '../src/parts/Expect/Expect.ts'
import { parseCssSelector } from '../src/parts/ParseCssSelector/ParseCssSelector.ts'
import * as WebViewState from '../src/parts/WebViewState/WebViewState.ts'

const createLocator = (selector: string = 'button'): any => {
  return {
    _parsed: parseCssSelector(selector),
    _selector: selector,
  }
}

test('toHaveText: ok path', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  const locator = createLocator('button')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toHaveText('Hello')

  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkSingleElementCondition', locator._parsed, ConditionType.ToHaveText, { text: 'Hello' }]])
})

test('sends chained, has-text, and nth locator data without duplicate selector text', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  const locator = createRealLocator('form', { hasText: 'Settings' }).locator('button').nth(2) as ILocator
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toBeVisible()

  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkSingleElementCondition', locator._parsed, ConditionType.ToBeVisible, {}]])
})

test('keeps legacy locator payload for webview conditions', async () => {
  const invocations: any[] = []
  WebViewState.set('webview-1', {
    async invoke(...params: readonly any[]) {
      invocations.push(params)
      return {}
    },
  })
  const locator = {
    ...createLocator('button'),
    webViewId: 'webview-1',
  }

  await ExpectMod.expect(locator).toBeVisible()

  expect(invocations).toEqual([['TestFrameWork.checkSingleElementCondition', locator, ConditionType.ToBeVisible, {}]])
})

test('toHaveText: error path builds ConditionErrors', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: 'Hello', wasFound: true }
    },
    'TestFrameWork.checkSingleElementCondition'() {
      return { error: true }
    },
  })

  const locator = createLocator('button')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toHaveText('World')).rejects.toMatchObject({
    message: expect.stringContaining('expected selector button to have text "World"'),
  })

  // Verify the RPC was called
  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator._parsed, ConditionType.ToHaveText, { text: 'World' }],
    ['TestFrameWork.checkConditionError', ConditionType.ToHaveText, locator._parsed, { text: 'World' }],
  ])
})

test('toHaveCount: validates number', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkMultiElementCondition'() {
      return {}
    },
  })
  const locator = createLocator('.item')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toHaveCount(2)
  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkMultiElementCondition', locator._parsed, ConditionType.ToHaveCount, { count: 2 }]])
})

test('toBeVisible: negated throws guidance', async () => {
  const locator = createLocator('.panel')
  const expectLocator = ExpectMod.expect(locator).not
  await expect(expectLocator.toBeVisible()).rejects.toThrow('use toBeHidden instead of not.toBeVisible')
})

test('checkMultiElementCondition: error path builds ConditionErrors', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: 1, wasFound: true }
    },
    'TestFrameWork.checkMultiElementCondition'() {
      return { error: true }
    },
  })

  const locator = createLocator('.item')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toHaveCount(2)).rejects.toMatchObject({
    message: expect.stringContaining('expected .item to have count 2 but was 1'),
  })

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkMultiElementCondition', locator._parsed, ConditionType.ToHaveCount, { count: 2 }],
    ['TestFrameWork.checkConditionError', ConditionType.ToHaveCount, locator._parsed],
  ])
})

test('toBeVisible: success path', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  const locator = createLocator('button')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toBeVisible()

  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkSingleElementCondition', locator._parsed, ConditionType.ToBeVisible, {}]])
})

test('toContainText: success path', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toContainText('Hello World')

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator._parsed, ConditionType.ToContainText, { text: 'Hello World' }],
  ])
})

test('toContainText: error path', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: 'Hello', wasFound: true }
    },
    'TestFrameWork.checkSingleElementCondition'() {
      return { error: true }
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toContainText('World')).rejects.toMatchObject({
    message: expect.stringContaining('expected selector div to contain text "World" but was "Hello"'),
  })

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator._parsed, ConditionType.ToContainText, { text: 'World' }],
    ['TestFrameWork.checkConditionError', ConditionType.ToContainText, locator._parsed, { text: 'World' }],
  ])
})

test('toHaveValue: success path', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  const locator = createLocator('input')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toHaveValue('test value')

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator._parsed, ConditionType.ToHaveValue, { value: 'test value' }],
  ])
})

test('toHaveValue: error path', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: 'different value', wasFound: true }
    },
    'TestFrameWork.checkSingleElementCondition'() {
      return { error: true }
    },
  })

  const locator = createLocator('input')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toHaveValue('expected value')).rejects.toMatchObject({
    message: expect.stringContaining('expected selector input to have value expected value'),
  })

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator._parsed, ConditionType.ToHaveValue, { value: 'expected value' }],
  ])
})

test('toBeFocused: success path', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  const locator = createLocator('input')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toBeFocused()

  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkSingleElementCondition', locator._parsed, ConditionType.ToBeFocused, undefined]])
})

test('toBeFocused: error path', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: false, wasFound: true }
    },
    'TestFrameWork.checkSingleElementCondition'() {
      return { error: true }
    },
  })

  const locator = createLocator('input')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toBeFocused()).rejects.toMatchObject({
    message: expect.stringContaining('expected input to be focused but active element is false'),
  })

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator._parsed, ConditionType.ToBeFocused, undefined],
    ['TestFrameWork.checkConditionError', ConditionType.ToBeFocused, locator._parsed, undefined],
  ])
})

test('toHaveCSS: success path', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toHaveCSS('color', 'red')

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator._parsed, ConditionType.ToHaveCss, { key: 'color', value: 'red' }],
  ])
})

test('toHaveCSS: error path', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: 'blue', wasFound: true }
    },
    'TestFrameWork.checkSingleElementCondition'() {
      return { error: true }
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toHaveCSS('color', 'red')).rejects.toMatchObject({
    message: expect.stringContaining('expected div to have css color red but was blue'),
  })

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator._parsed, ConditionType.ToHaveCss, { key: 'color', value: 'red' }],
    ['TestFrameWork.checkConditionError', ConditionType.ToHaveCss, locator._parsed, { key: 'color', value: 'red' }],
  ])
})

test('toHaveAttribute: success path', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  const locator = createLocator('input')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toHaveAttribute('type', 'text')

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator._parsed, ConditionType.ToHaveAttribute, { key: 'type', value: 'text' }],
  ])
})

test('toHaveAttribute: error path', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: 'password', wasFound: true }
    },
    'TestFrameWork.checkSingleElementCondition'() {
      return { error: true }
    },
  })

  const locator = createLocator('input')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toHaveAttribute('type', 'text')).rejects.toMatchObject({
    message: expect.stringContaining('expected input to have attribute type text but was password'),
  })

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator._parsed, ConditionType.ToHaveAttribute, { key: 'type', value: 'text' }],
    ['TestFrameWork.checkConditionError', ConditionType.ToHaveAttribute, locator._parsed, { key: 'type', value: 'text' }],
  ])
})

test('toHaveJSProperty: success path', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toHaveJSProperty('innerHTML', '<span>test</span>')

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator._parsed, ConditionType.ToHaveJSProperty, { key: 'innerHTML', value: '<span>test</span>' }],
  ])
})

test('toHaveJSProperty: error path', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: '<div>different</div>', wasFound: true }
    },
    'TestFrameWork.checkSingleElementCondition'() {
      return { error: true }
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toHaveJSProperty('innerHTML', '<span>test</span>')).rejects.toMatchObject({
    message: expect.stringContaining('expected div to have js property innerHTML <span>test</span> but was <div>different</div>'),
  })

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator._parsed, ConditionType.ToHaveJSProperty, { key: 'innerHTML', value: '<span>test</span>' }],
    ['TestFrameWork.checkConditionError', ConditionType.ToHaveJSProperty, locator._parsed, { key: 'innerHTML', value: '<span>test</span>' }],
  ])
})

test('toHaveClass: success path', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toHaveClass('active')

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator._parsed, ConditionType.ToHaveClass, { className: 'active' }],
  ])
})

test('toHaveClass: error path', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: 'inactive', wasFound: true }
    },
    'TestFrameWork.checkSingleElementCondition'() {
      return { error: true }
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toHaveClass('active')).rejects.toMatchObject({
    message: expect.stringContaining('expected div to have class active'),
  })

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator._parsed, ConditionType.ToHaveClass, { className: 'active' }],
    ['TestFrameWork.checkConditionError', ConditionType.ToHaveClass, locator._parsed, { className: 'active' }],
  ])
})

test('toHaveId: success path', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toHaveId('my-element')

  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkSingleElementCondition', locator._parsed, ConditionType.ToHaveId, { id: 'my-element' }]])
})

test('toHaveId: error path', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: 'different-id', wasFound: true }
    },
    'TestFrameWork.checkSingleElementCondition'() {
      return { error: true }
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toHaveId('my-element')).rejects.toMatchObject({
    message: expect.stringContaining('expected div to have id my-element but was different-id'),
  })

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', locator._parsed, ConditionType.ToHaveId, { id: 'my-element' }],
    ['TestFrameWork.checkConditionError', ConditionType.ToHaveId, locator._parsed, { id: 'my-element' }],
  ])
})

test('toBeHidden: success path', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkMultiElementCondition'() {
      return {}
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expectLocator.toBeHidden()

  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkMultiElementCondition', locator._parsed, ConditionType.ToBeHidden, {}]])
})

test('toBeHidden: error path', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: true, wasFound: true }
    },
    'TestFrameWork.checkMultiElementCondition'() {
      return { error: true }
    },
  })

  const locator = createLocator('div')
  const expectLocator = ExpectMod.expect(locator)
  await expect(expectLocator.toBeHidden()).rejects.toMatchObject({
    message: expect.stringContaining('expected div to be hidden'),
  })

  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkMultiElementCondition', locator._parsed, ConditionType.ToBeHidden, {}]])
})
