import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createLocator } from '../src/parts/CreateLocator/CreateLocator.ts'

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
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.performAction'() {
      return undefined
    },
  })
  const selector = 'button'
  const options = {}
  const locator = createLocator(selector, options)
  await locator.click()
  expect(mockRpc.invocations).toHaveLength(1)
  expect(mockRpc.invocations[0]).toEqual([
    'TestFrameWork.performAction',
    locator,
    'click',
    {
      bubbles: true,
      button: 0,
      cancable: true,
      detail: 1,
    },
  ])
})

test('hover', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.performAction'() {
      return undefined
    },
  })
  const selector = 'button'
  const options = {}
  const locator = createLocator(selector, options)
  await locator.hover()
  expect(mockRpc.invocations).toHaveLength(1)
  expect(mockRpc.invocations[0]).toEqual([
    'TestFrameWork.performAction',
    locator,
    'hover',
    {
      bubbles: true,
      cancable: true,
    },
  ])
})

test('type', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.performAction'() {
      return undefined
    },
  })
  const selector = 'button'
  const options = {}
  const locator = createLocator(selector, options)
  await locator.type('a')
  expect(mockRpc.invocations).toHaveLength(1)
  expect(mockRpc.invocations[0]).toEqual([
    'TestFrameWork.performAction',
    locator,
    'type',
    {
      text: 'a',
    },
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
