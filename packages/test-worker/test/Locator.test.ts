import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createLocator } from '../src/parts/CreateLocator/CreateLocator.ts'

test('create', () => {
  const selector = 'button'
  const options = {}
  expect(createLocator(selector, options)).toMatchObject({
    _hasText: '',
    _nth: -1,
    _selector: 'button',
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
    _nth: 0,
  })
})

test('locator with nth', () => {
  const selector = 'button'
  const options = { nth: 2 }
  const locator = createLocator(selector, options)
  const subLocator = locator.locator('span')
  expect((subLocator as any)._selector).toBe('button:nth-of-type(3) span')
})

test('locator without nth', () => {
  const selector = 'button'
  const options = {}
  const locator = createLocator(selector, options)
  const subLocator = locator.locator('span')
  expect((subLocator as any)._selector).toBe('button span')
})

test('nth', () => {
  const selector = 'button'
  const options = {}
  const locator = createLocator(selector, options)
  const nthLocator = locator.nth(1)
  expect(nthLocator as any).toMatchObject({
    _nth: 1,
    _selector: 'button',
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
