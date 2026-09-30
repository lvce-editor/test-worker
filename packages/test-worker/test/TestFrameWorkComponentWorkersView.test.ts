import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as WorkersView from '../src/parts/TestFrameWorkComponentWorkersView/TestFrameWorkComponentWorkersView.ts'

const getSelector = (locator: any): string => locator._selector
const getNth = (locator: any): number | undefined => locator._parsed.find((part: any) => part.type === 4)?.index

test('open and refresh', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri'() {},
    'Workers.autoRefresh'() {},
    'Workers.refresh'() {},
    'Workers.resize'() {},
    'Workers.setError'() {},
  })

  const error = new Error('Workers view test error')
  await WorkersView.open()
  await WorkersView.setError(error)
  await WorkersView.autoRefresh()
  await WorkersView.refresh()
  await WorkersView.resize(800, 600)

  expect(mockRpc.invocations).toEqual([
    ['Main.openUri', 'workers:///1'],
    ['Workers.setError', error],
    ['Workers.autoRefresh'],
    ['Workers.refresh'],
    ['Workers.resize', 800, 600],
  ])
})

test('locators', () => {
  expect(getSelector(WorkersView.root())).toBe('.WorkersView')
  expect(getSelector(WorkersView.heading())).toBe('.WorkersView h1')
  expect(getSelector(WorkersView.table())).toBe('.WorkersView [role="table"][aria-label="Workers"]')
  expect(getSelector(WorkersView.error())).toBe('.WorkersView [role="alert"]')
  expect(getSelector(WorkersView.headerCell(0))).toBe('.WorkersView .WorkersViewTableHeaderCell')
  expect(getNth(WorkersView.nameHeader())).toBe(0)
  expect(getNth(WorkersView.memoryHeader())).toBe(1)
  expect(getSelector(WorkersView.headerButton(0))).toBe('.WorkersView .WorkersViewTableHeaderButton')
  expect(getNth(WorkersView.nameHeaderButton())).toBe(0)
  expect(getNth(WorkersView.memoryHeaderButton())).toBe(1)
})
