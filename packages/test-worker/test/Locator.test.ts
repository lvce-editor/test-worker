import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createLocator } from '../src/parts/CreateLocator/CreateLocator.ts'
import { Locator } from '../src/parts/Locator/Locator.ts'

test('create', () => {
  const selector = 'button'
  const options = {}
  expect(createLocator(selector, options)).toMatchObject({
    _parsed: [
      {
        selector: 'button',
        type: 'css',
      },
    ],
  })
})

test('click', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.performAction'() {
      return undefined
    },
  })
  const selector = 'button'
  const options = {}
  const locator = createLocator(selector, options)
  await locator.click()
  expect(mockRpc.invocations).toEqual([
    [
      'TestFrameWork.performAction',
      locator,
      'click',
      {
        bubbles: true,
        button: 0,
        cancable: true,
        detail: 1,
      },
    ],
  ])
})

test('hover', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.performAction'() {
      return undefined
    },
  })
  const selector = 'button'
  const options = {}
  const locator = createLocator(selector, options)
  await locator.hover()
  expect(mockRpc.invocations).toEqual([
    [
      'TestFrameWork.performAction',
      locator,
      'hover',
      {
        bubbles: true,
        cancable: true,
      },
    ],
  ])
})

test('type', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.performAction'() {
      return undefined
    },
  })
  const selector = 'button'
  const options = {}
  const locator = createLocator(selector, options)
  await locator.type('a')
  expect(mockRpc.invocations).toEqual([
    [
      'TestFrameWork.performAction',
      locator,
      'type',
      {
        text: 'a',
      },
    ],
  ])
})

test('first', () => {
  const selector = 'button'
  const options = {}
  const locator = createLocator(selector, options)
  expect(locator.first()).toMatchObject({
    _parsed: [
      {
        selector: 'button',
        type: 'css',
      },
      {
        index: 0,
        type: 'nth',
      },
    ],
  })
})

test('locator with nth', () => {
  const selector = 'button'
  const options = { nth: 2 }
  const locator = createLocator(selector, options)
  const subLocator = locator.locator('span')
  expect((subLocator as any)._parsed).toEqual([
    {
      selector: 'button',
      type: 'css',
    },
    {
      index: 2,
      type: 'nth',
    },
    {
      selector: 'span',
      type: 'css',
    },
  ])
})

test('locator without nth', () => {
  const selector = 'button'
  const options = {}
  const locator = createLocator(selector, options)
  const subLocator = locator.locator('span')
  expect((subLocator as any)._parsed).toEqual([
    {
      selector: 'button',
      type: 'css',
    },
    {
      selector: 'span',
      type: 'css',
    },
  ])
})

test('nth', () => {
  const selector = 'button'
  const options = {}
  const locator = createLocator(selector, options)
  const nthLocator = locator.nth(1)
  expect(nthLocator as any).toMatchObject({
    _parsed: [
      {
        selector: 'button',
        type: 'css',
      },
      {
        index: 1,
        type: 'nth',
      },
    ],
  })
})

test('dispatchEvent', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.performAction'() {
      return undefined
    },
  })
  const selector = 'button'
  const options = {}
  const locator = createLocator(selector, options)
  await locator.dispatchEvent('click', '{"bubbles": true}')
  expect(mockRpc.invocations).toEqual([
    [
      'TestFrameWork.performAction',
      locator,
      'dispatchEvent',
      {
        init: '{"bubbles": true}',
        type: 'click',
      },
    ],
  ])
})

test('constructor throws for non-object options', () => {
  expect(() => new Locator('button', null as any)).toThrow(new TypeError('options must be of type object'))
})

test('constructor throws for non-string hasText', () => {
  expect(() => new Locator('button', { hasText: 42 as any })).toThrow(new TypeError('options.hasText must be of type string'))
})

test('constructor throws for non-number nth', () => {
  expect(() => new Locator('button', { nth: '1' as any })).toThrow(new TypeError('options.nth must be of type number'))
})

test('constructor parses selector', () => {
  expect(new Locator('.button text=Save')).toMatchObject({
    _parsed: [
      {
        selector: '.button',
        type: 'css',
      },
      {
        text: 'Save',
        type: 'text',
      },
    ],
  })
})

test('constructor throws for unsupported selector', () => {
  expect(() => new Locator('buttonish')).toThrow(new Error('unsupported selector: buttonish'))
})
