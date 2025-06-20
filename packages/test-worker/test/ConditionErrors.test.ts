import { beforeEach, expect, jest, test } from '@jest/globals'
import type { ILocator } from '../src/parts/ILocator/ILocator.ts'

type MockReturnType = {
  wasFound?: boolean
  actual?: string | number
}

const mockLocatorInvoke = jest.fn<() => Promise<MockReturnType>>()

jest.unstable_mockModule('../src/parts/LocatorInvoke/LocatorInvoke.ts', () => ({
  locatorInvoke: mockLocatorInvoke,
}))

const ConditionErrors = await import('../src/parts/ConditionErrors/ConditionErrors.ts')

beforeEach(() => {
  mockLocatorInvoke.mockReset()
})

test('toBeVisible', () => {
  const locator: ILocator = {
    _selector: '.button',
    _nth: -1,
    _hasText: '',
  }
  expect(ConditionErrors.toBeVisible(locator)).toBe('expected selector to be visible .button')
})

test('toHaveValue', () => {
  const locator: ILocator = {
    _selector: '.input',
    _nth: -1,
    _hasText: '',
  }
  expect(ConditionErrors.toHaveValue(locator, { value: 'test' })).toBe('expected selector .input to have value test')
})

test('toHaveText - element not found', async () => {
  const locator: ILocator = {
    _selector: '.text',
    _nth: -1,
    _hasText: '',
  }
  mockLocatorInvoke.mockResolvedValue({ wasFound: false, actual: '' })
  const result = await ConditionErrors.toHaveText(locator, { text: 'hello' })
  expect(result).toBe('expected selector .text to have text "hello" element was not found')
  expect(mockLocatorInvoke).toHaveBeenCalledTimes(1)
  // @ts-ignore
  expect(mockLocatorInvoke).toHaveBeenCalledWith(locator, 'TestFrameWork.checkConditionError', 'toHaveText', locator, { text: 'hello' })
})

test('toHaveText - wrong text', async () => {
  const locator: ILocator = {
    _selector: '.text',
    _nth: -1,
    _hasText: '',
  }
  mockLocatorInvoke.mockResolvedValue({ wasFound: true, actual: 'world' })
  const result = await ConditionErrors.toHaveText(locator, { text: 'hello' })
  expect(result).toBe('expected selector .text to have text "hello" but was "world"')
  expect(mockLocatorInvoke).toHaveBeenCalledTimes(1)
  // @ts-ignore
  expect(mockLocatorInvoke).toHaveBeenCalledWith(locator, 'TestFrameWork.checkConditionError', 'toHaveText', locator, { text: 'hello' })
})

test('toHaveText - with hasText selector', async () => {
  const locator: ILocator = {
    _selector: '.item',
    _nth: -1,
    _hasText: 'hello',
  }
  mockLocatorInvoke.mockResolvedValue({ wasFound: true, actual: 'wrong' })
  const result = await ConditionErrors.toHaveText(locator, { text: 'test' })
  expect(result).toBe('expected selector .item "hello" to have text "test" but was "wrong"')
  expect(mockLocatorInvoke).toHaveBeenCalledTimes(1)
  // @ts-ignore
  expect(mockLocatorInvoke).toHaveBeenCalledWith(locator, 'TestFrameWork.checkConditionError', 'toHaveText', locator, { text: 'test' })
})

test('toHaveAttribute - element not found', async () => {
  const locator: ILocator = {
    _selector: '.link',
    _nth: -1,
    _hasText: '',
  }
  mockLocatorInvoke.mockResolvedValue({ wasFound: false, actual: '' })
  const result = await ConditionErrors.toHaveAttribute(locator, { key: 'href', value: '#' })
  expect(result).toBe('expected .link to have attribute href # but element was not found')
  expect(mockLocatorInvoke).toHaveBeenCalledTimes(1)
  // @ts-ignore
  expect(mockLocatorInvoke).toHaveBeenCalledWith(locator, 'TestFrameWork.checkConditionError', 'toHaveAttribute', locator, {
    key: 'href',
    value: '#',
  })
})

test('toHaveAttribute - wrong value', async () => {
  const locator: ILocator = {
    _selector: '.link',
    _nth: -1,
    _hasText: '',
  }
  mockLocatorInvoke.mockResolvedValue({ wasFound: true, actual: '/test' })
  const result = await ConditionErrors.toHaveAttribute(locator, { key: 'href', value: '#' })
  expect(result).toBe('expected .link to have attribute href # but was /test')
  expect(mockLocatorInvoke).toHaveBeenCalledTimes(1)
  // @ts-ignore
  expect(mockLocatorInvoke).toHaveBeenCalledWith(locator, 'TestFrameWork.checkConditionError', 'toHaveAttribute', locator, {
    key: 'href',
    value: '#',
  })
})

test('toHaveCount', async () => {
  const locator: ILocator = {
    _selector: '.items',
    _nth: -1,
    _hasText: '',
  }
  mockLocatorInvoke.mockResolvedValue({ actual: 1 })
  const result = await ConditionErrors.toHaveCount(locator, { count: 3 })
  expect(result).toBe('expected .items to have count 3 but was 1')
  expect(mockLocatorInvoke).toHaveBeenCalledTimes(1)
  // @ts-ignore
  expect(mockLocatorInvoke).toHaveBeenCalledWith(locator, 'TestFrameWork.checkConditionError', 'toHaveCount', locator)
})

test('toBeFocused', async () => {
  const locator: ILocator = {
    _selector: '.input',
    _nth: -1,
    _hasText: '',
  }
  mockLocatorInvoke.mockResolvedValue({ actual: 'BUTTON' })
  const result = await ConditionErrors.toBeFocused(locator)
  expect(result).toBe('expected .input to be focused but active element is BUTTON')
  expect(mockLocatorInvoke).toHaveBeenCalledTimes(1)
  // @ts-ignore
  expect(mockLocatorInvoke).toHaveBeenCalledWith(locator, 'TestFrameWork.checkConditionError', 'toBeFocused', locator)
})

test('toBeFocused - with document.body', async () => {
  const locator: ILocator = {
    _selector: '.input',
    _nth: -1,
    _hasText: '',
  }
  mockLocatorInvoke.mockResolvedValue({ actual: 'document.body' })
  const result = await ConditionErrors.toBeFocused(locator)
  expect(result).toBe('expected .input to be focused but active element is document.body')
  expect(mockLocatorInvoke).toHaveBeenCalledTimes(1)
  // @ts-ignore
  expect(mockLocatorInvoke).toHaveBeenCalledWith(locator, 'TestFrameWork.checkConditionError', 'toBeFocused', locator)
})

test('toBeHidden', () => {
  const locator: ILocator = {
    _selector: '.modal',
    _nth: -1,
    _hasText: '',
  }
  expect(ConditionErrors.toBeHidden(locator)).toBe('expected .modal to be hidden')
})

test('toHaveClass - element not found', async () => {
  const locator: ILocator = {
    _selector: '.button',
    _nth: -1,
    _hasText: '',
  }
  mockLocatorInvoke.mockResolvedValue({ wasFound: false })
  const result = await ConditionErrors.toHaveClass(locator, { className: 'active' })
  expect(result).toBe('expected .button to have class active but element was not found')
  expect(mockLocatorInvoke).toHaveBeenCalledTimes(1)
  // @ts-ignore
  expect(mockLocatorInvoke).toHaveBeenCalledWith(locator, 'TestFrameWork.checkConditionError', 'toHaveClass', locator, { className: 'active' })
})

test('toHaveClass - wrong class', async () => {
  const locator: ILocator = {
    _selector: '.button',
    _nth: -1,
    _hasText: '',
  }
  mockLocatorInvoke.mockResolvedValue({ wasFound: true })
  const result = await ConditionErrors.toHaveClass(locator, { className: 'active' })
  expect(result).toBe('expected .button to have class active')
  expect(mockLocatorInvoke).toHaveBeenCalledTimes(1)
  // @ts-ignore
  expect(mockLocatorInvoke).toHaveBeenCalledWith(locator, 'TestFrameWork.checkConditionError', 'toHaveClass', locator, { className: 'active' })
})

test('toHaveId - element not found', async () => {
  const locator: ILocator = {
    _selector: '.button',
    _nth: -1,
    _hasText: '',
  }
  mockLocatorInvoke.mockResolvedValue({ wasFound: false, actual: '' })
  const result = await ConditionErrors.toHaveId(locator, { id: 'submit' })
  expect(result).toBe('expected .button to have id submit but element was not found')
  expect(mockLocatorInvoke).toHaveBeenCalledTimes(1)
  // @ts-ignore
  expect(mockLocatorInvoke).toHaveBeenCalledWith(locator, 'TestFrameWork.checkConditionError', 'toHaveId', locator, { id: 'submit' })
})

test('toHaveId - wrong id', async () => {
  const locator: ILocator = {
    _selector: '.button',
    _nth: -1,
    _hasText: '',
  }
  mockLocatorInvoke.mockResolvedValue({ wasFound: true, actual: 'cancel' })
  const result = await ConditionErrors.toHaveId(locator, { id: 'submit' })
  expect(result).toBe('expected .button to have id submit but was cancel')
  expect(mockLocatorInvoke).toHaveBeenCalledTimes(1)
  // @ts-ignore
  expect(mockLocatorInvoke).toHaveBeenCalledWith(locator, 'TestFrameWork.checkConditionError', 'toHaveId', locator, { id: 'submit' })
})

test('toHaveCss - element not found', async () => {
  const locator: ILocator = {
    _selector: '.button',
    _nth: -1,
    _hasText: '',
  }
  mockLocatorInvoke.mockResolvedValue({ wasFound: false, actual: '' })
  const result = await ConditionErrors.toHaveCss(locator, { key: 'display', value: 'flex' })
  expect(result).toBe('expected .button to have css display flex but element was not found')
  expect(mockLocatorInvoke).toHaveBeenCalledTimes(1)
  // @ts-ignore
  expect(mockLocatorInvoke).toHaveBeenCalledWith(locator, 'TestFrameWork.checkConditionError', 'toHaveCss', locator, {
    key: 'display',
    value: 'flex',
  })
})

test('toHaveCss - wrong value', async () => {
  const locator: ILocator = {
    _selector: '.button',
    _nth: -1,
    _hasText: '',
  }
  mockLocatorInvoke.mockResolvedValue({ wasFound: true, actual: 'block' })
  const result = await ConditionErrors.toHaveCss(locator, { key: 'display', value: 'flex' })
  expect(result).toBe('expected .button to have css display flex but was block')
  expect(mockLocatorInvoke).toHaveBeenCalledTimes(1)
  // @ts-ignore
  expect(mockLocatorInvoke).toHaveBeenCalledWith(locator, 'TestFrameWork.checkConditionError', 'toHaveCss', locator, {
    key: 'display',
    value: 'flex',
  })
})
