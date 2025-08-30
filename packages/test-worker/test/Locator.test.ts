import { expect, test, beforeEach, jest } from '@jest/globals'

beforeEach(() => {
  jest.resetAllMocks()
})

const mockInvoke = jest.fn()

jest.unstable_mockModule('@lvce-editor/rpc-registry', () => {
  return {
    RendererWorker: {
      invoke: mockInvoke,
    },
  }
})

const { createLocator } = await import('../src/parts/CreateLocator/CreateLocator.ts')

test('create', () => {
  const selector = 'button'
  const options = {}
  expect(createLocator(selector, options)).toMatchObject({
    _selector: 'button',
    _nth: -1,
    _hasText: '',
  })
})

test('click', async () => {
  const selector = 'button'
  const options = {}
  const locator = createLocator(selector, options)
  await locator.click()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  // @ts-ignore
  expect(mockInvoke).toHaveBeenCalledWith('TestFrameWork.performAction', locator, 'click', {
    bubbles: true,
    button: 0,
    cancable: true,
    detail: 1,
  })
})

test('hover', async () => {
  const selector = 'button'
  const options = {}
  const locator = createLocator(selector, options)
  await locator.hover()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  // @ts-ignore
  expect(mockInvoke).toHaveBeenCalledWith('TestFrameWork.performAction', locator, 'hover', {
    bubbles: true,
    cancable: true,
  })
})

test('type', async () => {
  const selector = 'button'
  const options = {}
  const locator = createLocator(selector, options)
  await locator.type('a')
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  // @ts-ignore
  expect(mockInvoke).toHaveBeenCalledWith('TestFrameWork.performAction', locator, 'type', {
    text: 'a',
  })
})

test('first', () => {
  const selector = 'button'
  const options = {}
  const locator = createLocator(selector, options)
  expect(locator.first()).toMatchObject({
    _nth: 0,
  })
})
