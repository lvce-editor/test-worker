import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ILocatorInternal } from '../src/parts/ILocatorInternal/ILocatorInternal.ts'
import * as ConditionErrors from '../src/parts/ConditionErrors/ConditionErrors.ts'

test('toBeVisible', () => {
  const locator: ILocatorInternal = {
    _hasText: '',
    _nth: -1,
    _selector: '.button',
  }
  expect(ConditionErrors.toBeVisible(locator)).toBe('expected selector to be visible .button')
})

test('toHaveValue', () => {
  const locator: ILocatorInternal = {
    _hasText: '',
    _nth: -1,
    _selector: '.input',
  }
  expect(ConditionErrors.toHaveValue(locator, { value: 'test' })).toBe('expected selector .input to have value test')
})

test('toHaveText - element not found', async () => {
  const locator: ILocatorInternal = {
    _hasText: '',
    _nth: -1,
    _selector: '.text',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: '', wasFound: false }
    },
  })
  const result = await ConditionErrors.toHaveText(locator, { text: 'hello' })
  expect(result).toBe('expected selector .text to have text "hello" element was not found')
  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkConditionError', 'toHaveText', locator, { text: 'hello' }]])
})

test('toHaveText - wrong text', async () => {
  const locator: ILocatorInternal = {
    _hasText: '',
    _nth: -1,
    _selector: '.text',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: 'world', wasFound: true }
    },
  })
  const result = await ConditionErrors.toHaveText(locator, { text: 'hello' })
  expect(result).toBe('expected selector .text to have text "hello" but was "world"')
  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkConditionError', 'toHaveText', locator, { text: 'hello' }]])
})

test('toHaveText - with hasText selector', async () => {
  const locator: ILocatorInternal = {
    _hasText: 'hello',
    _nth: -1,
    _selector: '.item',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: 'wrong', wasFound: true }
    },
  })
  const result = await ConditionErrors.toHaveText(locator, { text: 'test' })
  expect(result).toBe('expected selector .item "hello" to have text "test" but was "wrong"')
  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkConditionError', 'toHaveText', locator, { text: 'test' }]])
})

test('toHaveAttribute - element not found', async () => {
  const locator: ILocatorInternal = {
    _hasText: '',
    _nth: -1,
    _selector: '.link',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: '', wasFound: false }
    },
  })
  const result = await ConditionErrors.toHaveAttribute(locator, { key: 'href', value: '#' })
  expect(result).toBe('expected .link to have attribute href # but element was not found')
  expect(mockRpc.invocations).toEqual([
    [
      'TestFrameWork.checkConditionError',
      'toHaveAttribute',
      locator,
      {
        key: 'href',
        value: '#',
      },
    ],
  ])
})

test('toHaveAttribute - wrong value', async () => {
  const locator: ILocatorInternal = {
    _hasText: '',
    _nth: -1,
    _selector: '.link',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: '/test', wasFound: true }
    },
  })
  const result = await ConditionErrors.toHaveAttribute(locator, { key: 'href', value: '#' })
  expect(result).toBe('expected .link to have attribute href # but was /test')
  expect(mockRpc.invocations).toEqual([
    [
      'TestFrameWork.checkConditionError',
      'toHaveAttribute',
      locator,
      {
        key: 'href',
        value: '#',
      },
    ],
  ])
})

test('toHaveCount', async () => {
  const locator: ILocatorInternal = {
    _hasText: '',
    _nth: -1,
    _selector: '.items',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: 1 }
    },
  })
  const result = await ConditionErrors.toHaveCount(locator, { count: 3 })
  expect(result).toBe('expected .items to have count 3 but was 1')
  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkConditionError', 'toHaveCount', locator]])
})

test('toBeFocused', async () => {
  const locator: ILocatorInternal = {
    _hasText: '',
    _nth: -1,
    _selector: '.input',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: 'BUTTON' }
    },
  })
  const result = await ConditionErrors.toBeFocused(locator)
  expect(result).toBe('expected .input to be focused but active element is BUTTON')
  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkConditionError', 'toBeFocused', locator]])
})

test('toBeFocused - with document.body', async () => {
  const locator: ILocatorInternal = {
    _hasText: '',
    _nth: -1,
    _selector: '.input',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: 'document.body' }
    },
  })
  const result = await ConditionErrors.toBeFocused(locator)
  expect(result).toBe('expected .input to be focused but active element is document.body')
  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkConditionError', 'toBeFocused', locator]])
})

test('toBeHidden', () => {
  const locator: ILocatorInternal = {
    _hasText: '',
    _nth: -1,
    _selector: '.modal',
  }
  expect(ConditionErrors.toBeHidden(locator)).toBe('expected .modal to be hidden')
})

test('toHaveClass - element not found', async () => {
  const locator: ILocatorInternal = {
    _hasText: '',
    _nth: -1,
    _selector: '.button',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { wasFound: false }
    },
  })
  const result = await ConditionErrors.toHaveClass(locator, { className: 'active' })
  expect(result).toBe('expected .button to have class active but element was not found')
  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkConditionError', 'toHaveClass', locator, { className: 'active' }]])
})

test('toHaveClass - wrong class', async () => {
  const locator: ILocatorInternal = {
    _hasText: '',
    _nth: -1,
    _selector: '.button',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { wasFound: true }
    },
  })
  const result = await ConditionErrors.toHaveClass(locator, { className: 'active' })
  expect(result).toBe('expected .button to have class active')
  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkConditionError', 'toHaveClass', locator, { className: 'active' }]])
})

test('toHaveId - element not found', async () => {
  const locator: ILocatorInternal = {
    _hasText: '',
    _nth: -1,
    _selector: '.button',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: '', wasFound: false }
    },
  })
  const result = await ConditionErrors.toHaveId(locator, { id: 'submit' })
  expect(result).toBe('expected .button to have id submit but element was not found')
  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkConditionError', 'toHaveId', locator, { id: 'submit' }]])
})

test('toHaveId - wrong id', async () => {
  const locator: ILocatorInternal = {
    _hasText: '',
    _nth: -1,
    _selector: '.button',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: 'cancel', wasFound: true }
    },
  })
  const result = await ConditionErrors.toHaveId(locator, { id: 'submit' })
  expect(result).toBe('expected .button to have id submit but was cancel')
  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkConditionError', 'toHaveId', locator, { id: 'submit' }]])
})

test('toHaveCss - element not found', async () => {
  const locator: ILocatorInternal = {
    _hasText: '',
    _nth: -1,
    _selector: '.button',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: '', wasFound: false }
    },
  })
  const result = await ConditionErrors.toHaveCss(locator, { key: 'display', value: 'flex' })
  expect(result).toBe('expected .button to have css display flex but element was not found')
  expect(mockRpc.invocations).toEqual([
    [
      'TestFrameWork.checkConditionError',
      'toHaveCss',
      locator,
      {
        key: 'display',
        value: 'flex',
      },
    ],
  ])
})

test('toHaveCss - wrong value', async () => {
  const locator: ILocatorInternal = {
    _hasText: '',
    _nth: -1,
    _selector: '.button',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: 'block', wasFound: true }
    },
  })
  const result = await ConditionErrors.toHaveCss(locator, { key: 'display', value: 'flex' })
  expect(result).toBe('expected .button to have css display flex but was block')
  expect(mockRpc.invocations).toEqual([
    [
      'TestFrameWork.checkConditionError',
      'toHaveCss',
      locator,
      {
        key: 'display',
        value: 'flex',
      },
    ],
  ])
})

test('toContainText - element not found', async () => {
  const locator: ILocatorInternal = {
    _hasText: '',
    _nth: -1,
    _selector: '.text',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: '', wasFound: false }
    },
  })
  const result = await ConditionErrors.toContainText(locator, { text: 'hello' })
  expect(result).toBe('expected selector .text to contain text "hello" element was not found')
  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkConditionError', 'toContainText', locator, { text: 'hello' }]])
})

test('toContainText - wrong text', async () => {
  const locator: ILocatorInternal = {
    _hasText: '',
    _nth: -1,
    _selector: '.text',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: 'world', wasFound: true }
    },
  })
  const result = await ConditionErrors.toContainText(locator, { text: 'hello' })
  expect(result).toBe('expected selector .text to contain text "hello" but was "world"')
  expect(mockRpc.invocations).toEqual([['TestFrameWork.checkConditionError', 'toContainText', locator, { text: 'hello' }]])
})

test('toHaveJSProperty - element not found', async () => {
  const locator: ILocatorInternal = {
    _hasText: '',
    _nth: -1,
    _selector: '.button',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: '', wasFound: false }
    },
  })
  const result = await ConditionErrors.toHaveJSProperty(locator, { key: 'disabled', value: 'true' })
  expect(result).toBe('expected .button to have js property disabled true but element was not found')
  expect(mockRpc.invocations).toEqual([
    [
      'TestFrameWork.checkConditionError',
      'toHaveJSProperty',
      locator,
      {
        key: 'disabled',
        value: 'true',
      },
    ],
  ])
})

test('toHaveJSProperty - wrong value', async () => {
  const locator: ILocatorInternal = {
    _hasText: '',
    _nth: -1,
    _selector: '.button',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: 'false', wasFound: true }
    },
  })
  const result = await ConditionErrors.toHaveJSProperty(locator, { key: 'disabled', value: 'true' })
  expect(result).toBe('expected .button to have js property disabled true but was false')
  expect(mockRpc.invocations).toEqual([
    [
      'TestFrameWork.checkConditionError',
      'toHaveJSProperty',
      locator,
      {
        key: 'disabled',
        value: 'true',
      },
    ],
  ])
})
