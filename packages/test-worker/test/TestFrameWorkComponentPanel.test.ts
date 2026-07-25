import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Panel from '../src/parts/TestFrameWorkComponentPanel/TestFrameWorkComponentPanel.ts'

test('close', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Panel.handleClickClose'() {
      return undefined
    },
  })

  await Panel.close()
  expect(mockRpc.invocations).toEqual([['Panel.handleClickClose']])
})

test('hide', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.hidePanel'() {
      return undefined
    },
  })

  await Panel.hide()
  expect(mockRpc.invocations).toEqual([['Layout.hidePanel']])
})

test('open', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.showPanel'() {
      return undefined
    },
  })

  await Panel.open('test-panel')
  expect(mockRpc.invocations).toEqual([['Layout.showPanel', 'test-panel']])
})

test('openProblems', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.showPanel'() {
      return undefined
    },
    'Panel.selectIndex'() {
      return undefined
    },
  })

  await Panel.openProblems()
  expect(mockRpc.invocations).toEqual([
    ['Layout.showPanel', 'Problems'],
    ['Panel.selectIndex', 0],
  ])
})

test('select', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Panel.selectName'() {
      return undefined
    },
  })

  await Panel.select('Output')
  expect(mockRpc.invocations).toEqual([['Panel.selectName', 'Output']])
})

test('maximize', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.maximizePanel'() {
      return undefined
    },
  })

  await Panel.maximize()
  expect(mockRpc.invocations).toEqual([['Layout.maximizePanel']])
})

test('unmaximize', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.unmaximizePanel'() {
      return undefined
    },
  })

  await Panel.unmaximize()
  expect(mockRpc.invocations).toEqual([['Layout.unmaximizePanel']])
})
