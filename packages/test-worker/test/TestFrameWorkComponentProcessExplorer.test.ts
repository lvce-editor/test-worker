import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ProcessExplorer from '../src/parts/TestFrameWorkComponentProcessExplorer/TestFrameWorkComponentProcessExplorer.ts'

const getSelector = (locator: any): string => {
  return locator._selector
}

const getParsed = (locator: any): readonly any[] => {
  return locator._parsed
}

const normalizeConditionInvocations = (invocations: readonly any[]): readonly any[] => {
  return invocations.map(([command, locator, condition, options]) => [command, getSelector(locator), condition, options])
}

test('command helpers', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Developer.openProcessExplorer'() {
      return undefined
    },
    'ProcessExplorer.collapseAll'() {
      return undefined
    },
    'ProcessExplorer.debugProcess'() {
      return undefined
    },
    'ProcessExplorer.expandAll'() {
      return undefined
    },
    'ProcessExplorer.focusFirst'() {
      return undefined
    },
    'ProcessExplorer.focusLast'() {
      return undefined
    },
    'ProcessExplorer.focusNext'() {
      return undefined
    },
    'ProcessExplorer.focusPrevious'() {
      return undefined
    },
    'ProcessExplorer.handleArrowLeft'() {
      return undefined
    },
    'ProcessExplorer.handleArrowRight'() {
      return undefined
    },
    'ProcessExplorer.handleClickAt'() {
      return undefined
    },
    'ProcessExplorer.handleContextMenu'() {
      return undefined
    },
    'ProcessExplorer.handleDoubleClick'() {
      return undefined
    },
    'ProcessExplorer.killProcess'() {
      return undefined
    },
    'ProcessExplorer.refresh'() {
      return undefined
    },
  })

  await ProcessExplorer.open()
  await ProcessExplorer.refresh()
  await ProcessExplorer.collapseAll()
  await ProcessExplorer.expandAll()
  await ProcessExplorer.focusFirst()
  await ProcessExplorer.focusLast()
  await ProcessExplorer.focusNext()
  await ProcessExplorer.focusPrevious()
  await ProcessExplorer.handleArrowLeft()
  await ProcessExplorer.handleArrowRight()
  await ProcessExplorer.clickRow(2)
  await ProcessExplorer.doubleClickRow(3)
  await ProcessExplorer.openContextMenu(4)
  await ProcessExplorer.killProcess(5)
  await ProcessExplorer.debugProcess(6)

  expect(mockRpc.invocations).toEqual([
    ['Developer.openProcessExplorer'],
    ['ProcessExplorer.refresh'],
    ['ProcessExplorer.collapseAll'],
    ['ProcessExplorer.expandAll'],
    ['ProcessExplorer.focusFirst'],
    ['ProcessExplorer.focusLast'],
    ['ProcessExplorer.focusNext'],
    ['ProcessExplorer.focusPrevious'],
    ['ProcessExplorer.handleArrowLeft'],
    ['ProcessExplorer.handleArrowRight'],
    ['ProcessExplorer.handleClickAt', 2],
    ['ProcessExplorer.handleDoubleClick', 3],
    ['ProcessExplorer.handleContextMenu', 4],
    ['ProcessExplorer.killProcess', 5],
    ['ProcessExplorer.debugProcess', 6],
  ])
})

test('optional row index commands omit index when undefined', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ProcessExplorer.debugProcess'() {
      return undefined
    },
    'ProcessExplorer.handleContextMenu'() {
      return undefined
    },
    'ProcessExplorer.handleDoubleClick'() {
      return undefined
    },
    'ProcessExplorer.killProcess'() {
      return undefined
    },
  })

  await ProcessExplorer.doubleClickRow()
  await ProcessExplorer.openContextMenu()
  await ProcessExplorer.killProcess()
  await ProcessExplorer.debugProcess()

  expect(mockRpc.invocations).toEqual([
    ['ProcessExplorer.handleDoubleClick'],
    ['ProcessExplorer.handleContextMenu'],
    ['ProcessExplorer.killProcess'],
    ['ProcessExplorer.debugProcess'],
  ])
})

test('locator helpers use process explorer selectors', () => {
  expect(getSelector(ProcessExplorer.root())).toBe('.ProcessExplorer')
  expect(getSelector(ProcessExplorer.table())).toBe('.ProcessExplorerTable')
  expect(getSelector(ProcessExplorer.error())).toBe('.ProcessExplorerError')
  expect(getSelector(ProcessExplorer.rows())).toBe('.ProcessExplorerRow')
  expect(getSelector(ProcessExplorer.focusedRow())).toBe('.ProcessExplorerRowFocused')
  expect(getSelector(ProcessExplorer.expandedRow())).toBe('.ProcessExplorerRow[aria-expanded="true"]')
  expect(getSelector(ProcessExplorer.collapsedRow())).toBe('.ProcessExplorerRow[aria-expanded="false"]')
  expect(getSelector(ProcessExplorer.headerCell(1))).toBe('.ProcessExplorer .ProcessExplorerHeaderCell')
  expect(getSelector(ProcessExplorer.nameHeader())).toBe('.ProcessExplorer .ProcessExplorerHeaderCell')
  expect(getSelector(ProcessExplorer.pidHeader())).toBe('.ProcessExplorer .ProcessExplorerHeaderCell')
  expect(getSelector(ProcessExplorer.memoryHeader())).toBe('.ProcessExplorer .ProcessExplorerHeaderCell')
  expect(getSelector(ProcessExplorer.row(2))).toBe('.ProcessExplorerRow')
  expect(getSelector(ProcessExplorer.nameCell(2))).toBe('.ProcessExplorerRow .ProcessExplorerNameCell')
  expect(getSelector(ProcessExplorer.pidCell(2))).toBe('.ProcessExplorerRow .ProcessExplorerCell')
  expect(getSelector(ProcessExplorer.memoryCell(2))).toBe('.ProcessExplorerRow .ProcessExplorerCell')
})

test('indexed locator helpers keep nth selectors stable', () => {
  expect(getParsed(ProcessExplorer.headerCell(1))).toContainEqual({
    index: 1,
    type: 'nth',
  })
  expect(getParsed(ProcessExplorer.row(2))).toContainEqual({
    index: 2,
    type: 'nth',
  })
  expect(getParsed(ProcessExplorer.expandedRow())).toContainEqual({
    index: 0,
    type: 'nth',
  })
  expect(getParsed(ProcessExplorer.collapsedRow())).toContainEqual({
    index: 0,
    type: 'nth',
  })
  expect(getParsed(ProcessExplorer.pidCell(2))).toContainEqual({
    index: 1,
    type: 'nth',
  })
  expect(getParsed(ProcessExplorer.memoryCell(2))).toContainEqual({
    index: 2,
    type: 'nth',
  })
})

test('shouldBeOpen checks root and table visibility', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  await ProcessExplorer.shouldBeOpen()

  expect(normalizeConditionInvocations(mockRpc.invocations)).toEqual([
    ['TestFrameWork.checkSingleElementCondition', '.ProcessExplorer', 'toBeVisible', {}],
    ['TestFrameWork.checkSingleElementCondition', '.ProcessExplorerTable', 'toBeVisible', {}],
  ])
})

test('shouldBeHealthy checks table visibility and hidden error', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkMultiElementCondition'() {
      return {}
    },
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  await ProcessExplorer.shouldBeHealthy()

  expect(normalizeConditionInvocations(mockRpc.invocations)).toEqual([
    ['TestFrameWork.checkSingleElementCondition', '.ProcessExplorerTable', 'toBeVisible', {}],
    ['TestFrameWork.checkMultiElementCondition', '.ProcessExplorerError', 'toBeHidden', {}],
  ])
})

test('shouldHaveHeaders checks header text', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  await ProcessExplorer.shouldHaveHeaders()

  expect(normalizeConditionInvocations(mockRpc.invocations)).toEqual([
    ['TestFrameWork.checkSingleElementCondition', '.ProcessExplorer .ProcessExplorerHeaderCell', 'toHaveText', { text: 'Name' }],
    ['TestFrameWork.checkSingleElementCondition', '.ProcessExplorer .ProcessExplorerHeaderCell', 'toHaveText', { text: 'PID' }],
    ['TestFrameWork.checkSingleElementCondition', '.ProcessExplorer .ProcessExplorerHeaderCell', 'toHaveText', { text: 'Memory' }],
  ])
})

test('row assertion helpers check expected row locators', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  await ProcessExplorer.shouldHaveRow(1)
  await ProcessExplorer.shouldHaveFocusedRow()
  await ProcessExplorer.shouldHaveCollapsedRow()
  await ProcessExplorer.shouldHaveExpandedRow()

  expect(normalizeConditionInvocations(mockRpc.invocations)).toEqual([
    ['TestFrameWork.checkSingleElementCondition', '.ProcessExplorerRow', 'toBeVisible', {}],
    ['TestFrameWork.checkSingleElementCondition', '.ProcessExplorerRow .ProcessExplorerNameCell', 'toBeVisible', {}],
    ['TestFrameWork.checkSingleElementCondition', '.ProcessExplorerRow .ProcessExplorerCell', 'toBeVisible', {}],
    ['TestFrameWork.checkSingleElementCondition', '.ProcessExplorerRow .ProcessExplorerCell', 'toBeVisible', {}],
    ['TestFrameWork.checkSingleElementCondition', '.ProcessExplorerRowFocused', 'toBeVisible', {}],
    ['TestFrameWork.checkSingleElementCondition', '.ProcessExplorerRow[aria-expanded="false"]', 'toBeVisible', {}],
    ['TestFrameWork.checkSingleElementCondition', '.ProcessExplorerRow[aria-expanded="true"]', 'toBeVisible', {}],
  ])
})
