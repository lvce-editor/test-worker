import { afterEach, expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createLocator } from '../src/parts/CreateLocator/CreateLocator.ts'
import * as VideoPreview from '../src/parts/TestFrameWorkComponentVideoPreview/TestFrameWorkComponentVideoPreview.ts'

afterEach(() => {
  jest.useRealTimers()
})

test('waitForMediaPreviewReady resolves when media is ready', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  const media = createLocator('.VideoElement')
  await VideoPreview.waitForMediaPreviewReady(media)

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', media._parsed, 'toHaveJSProperty', { key: 'readyState', value: 4 }],
  ])
})

test('waitForMediaPreviewReady retries until media is ready', async () => {
  jest.useFakeTimers()
  let attempt = 0
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: 1, wasFound: true }
    },
    'TestFrameWork.checkSingleElementCondition'() {
      attempt++
      return attempt === 2 ? {} : { error: true }
    },
  })

  const media = createLocator('.AudioElement')
  await Promise.all([VideoPreview.waitForMediaPreviewReady(media), jest.advanceTimersByTimeAsync(100)])

  expect(mockRpc.invocations).toHaveLength(3)
  expect(mockRpc.invocations[0]).toEqual([
    'TestFrameWork.checkSingleElementCondition',
    media._parsed,
    'toHaveJSProperty',
    { key: 'readyState', value: 4 },
  ])
  expect(mockRpc.invocations[1]).toEqual(['TestFrameWork.checkConditionError', 'toHaveJSProperty', media._parsed, { key: 'readyState', value: 4 }])
  expect(mockRpc.invocations[2]).toEqual([
    'TestFrameWork.checkSingleElementCondition',
    media._parsed,
    'toHaveJSProperty',
    { key: 'readyState', value: 4 },
  ])
})

test('waitForMediaPreviewReady throws the last assertion error after exhausting retries', async () => {
  jest.useFakeTimers()
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkConditionError'() {
      return { actual: 2, wasFound: true }
    },
    'TestFrameWork.checkSingleElementCondition'() {
      return { error: true }
    },
  })

  const media = createLocator('.VideoElement')
  await Promise.all([
    expect(VideoPreview.waitForMediaPreviewReady(media)).rejects.toThrow('expected .VideoElement to have js property readyState 4 but was 2'),
    jest.advanceTimersByTimeAsync(5000),
  ])

  expect(mockRpc.invocations).toHaveLength(100)
})
