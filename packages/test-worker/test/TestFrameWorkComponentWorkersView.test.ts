import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as WorkersView from '../src/parts/TestFrameWorkComponentWorkersView/TestFrameWorkComponentWorkersView.ts'

const getSelector = (locator: any): string => locator._selector

test('open and refresh', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri'() {},
    'Workers.refresh'() {},
  })

  await WorkersView.open()
  await WorkersView.refresh()

  expect(mockRpc.invocations).toEqual([['Main.openUri', 'workers:///1'], ['Workers.refresh']])
})

test('locators', () => {
  expect(getSelector(WorkersView.root())).toBe('.workers-view')
  expect(getSelector(WorkersView.heading())).toBe('.workers-view h1')
  expect(getSelector(WorkersView.table())).toBe('.workers-view [role="table"][aria-label="Workers"]')
  expect(getSelector(WorkersView.refreshButton())).toBe('.workers-view button')
})
