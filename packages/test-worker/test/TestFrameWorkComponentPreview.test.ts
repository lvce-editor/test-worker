import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Preview from '../src/parts/TestFrameWorkComponentPreview/TestFrameWorkComponentPreview.ts'

test('open', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.showPreview'() {
      return undefined
    },
  })

  await Preview.open('file:///tmp/preview.html')
  expect(mockRpc.invocations).toEqual([['Layout.showPreview', 'file:///tmp/preview.html']])
})

test('handleClick', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preview.handleClick'() {
      return undefined
    },
  })

  await Preview.handleClick('hd-1')
  expect(mockRpc.invocations).toEqual([['Preview.handleClick', 'hd-1']])
})

test('handleInput', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preview.handleInput'() {
      return undefined
    },
  })

  await Preview.handleInput('hd-1', 'new value')
  expect(mockRpc.invocations).toEqual([['Preview.handleInput', 'hd-1', 'new value']])
})

test('handleMouseDown', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preview.handleMouseDown'() {
      return undefined
    },
  })

  await Preview.handleMouseDown('hd-1', 12, 34)
  expect(mockRpc.invocations).toEqual([['Preview.handleMouseDown', 'hd-1', 12, 34]])
})

test('handleMouseUp', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preview.handleMouseUp'() {
      return undefined
    },
  })

  await Preview.handleMouseUp('hd-1', 'value', 12, 34)
  expect(mockRpc.invocations).toEqual([['Preview.handleMouseUp', 'hd-1', 'value', 12, 34]])
})

test('handleMouseMove', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preview.handleMouseMove'() {
      return undefined
    },
  })

  await Preview.handleMouseMove('hd-1', 'value', 12, 34)
  expect(mockRpc.invocations).toEqual([['Preview.handleMouseMove', 'hd-1', 'value', 12, 34]])
})

test('handleKeyDown', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preview.handleKeyDown'() {
      return undefined
    },
  })

  await Preview.handleKeyDown('hd-1', 'Enter', 'Enter')
  expect(mockRpc.invocations).toEqual([['Preview.handleKeyDown', 'hd-1', 'Enter', 'Enter']])
})

test('setUri', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preview.setUri'() {
      return undefined
    },
  })

  await Preview.setUri('file:///tmp/updated-preview.html')
  expect(mockRpc.invocations).toEqual([['Preview.setUri', 'file:///tmp/updated-preview.html']])
})

test('waitForClick', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preview.waitForClick'() {
      return undefined
    },
  })

  await Preview.waitForClick()
  expect(mockRpc.invocations).toEqual([['Preview.waitForClick']])
})

test('waitForMutation', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preview.waitForMutation'() {
      return undefined
    },
  })

  await Preview.waitForMutation()
  expect(mockRpc.invocations).toEqual([['Preview.waitForMutation']])
})
