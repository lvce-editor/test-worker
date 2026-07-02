import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ILocatorExternal } from '../ILocatorExternal/ILocatorExternal.ts'
import { createLocator } from '../CreateLocator/CreateLocator.ts'
import { expect } from '../Expect/Expect.ts'

const invokeOptionalIndex = async (command: string, index: number | undefined): Promise<void> => {
  if (index === undefined) {
    await RendererWorker.invoke(command)
    return
  }
  await RendererWorker.invoke(command, index)
}

export const open = async (): Promise<void> => {
  await RendererWorker.invoke('Developer.openProcessExplorer')
}

export const refresh = async (): Promise<void> => {
  await RendererWorker.invoke('ProcessExplorer.refresh')
}

export const collapseAll = async (): Promise<void> => {
  await RendererWorker.invoke('ProcessExplorer.collapseAll')
}

export const expandAll = async (): Promise<void> => {
  await RendererWorker.invoke('ProcessExplorer.expandAll')
}

export const focusFirst = async (): Promise<void> => {
  await RendererWorker.invoke('ProcessExplorer.focusFirst')
}

export const focusLast = async (): Promise<void> => {
  await RendererWorker.invoke('ProcessExplorer.focusLast')
}

export const focusNext = async (): Promise<void> => {
  await RendererWorker.invoke('ProcessExplorer.focusNext')
}

export const focusPrevious = async (): Promise<void> => {
  await RendererWorker.invoke('ProcessExplorer.focusPrevious')
}

export const handleArrowLeft = async (): Promise<void> => {
  await RendererWorker.invoke('ProcessExplorer.handleArrowLeft')
}

export const handleArrowRight = async (): Promise<void> => {
  await RendererWorker.invoke('ProcessExplorer.handleArrowRight')
}

export const clickRow = async (index: number): Promise<void> => {
  await RendererWorker.invoke('ProcessExplorer.handleClickAt', index)
}

export const doubleClickRow = async (index?: number): Promise<void> => {
  await invokeOptionalIndex('ProcessExplorer.handleDoubleClick', index)
}

export const openContextMenu = async (index?: number): Promise<void> => {
  await invokeOptionalIndex('ProcessExplorer.handleContextMenu', index)
}

export const killProcess = async (index?: number): Promise<void> => {
  await invokeOptionalIndex('ProcessExplorer.killProcess', index)
}

export const debugProcess = async (index?: number): Promise<void> => {
  await invokeOptionalIndex('ProcessExplorer.debugProcess', index)
}

export const root = (): ILocatorExternal => {
  return createLocator('.ProcessExplorer')
}

export const table = (): ILocatorExternal => {
  return createLocator('.ProcessExplorerTable')
}

export const error = (): ILocatorExternal => {
  return createLocator('.ProcessExplorerError')
}

export const headerCell = (index: number): ILocatorExternal => {
  return root().locator('.ProcessExplorerHeaderCell').nth(index)
}

export const nameHeader = (): ILocatorExternal => {
  return headerCell(0)
}

export const pidHeader = (): ILocatorExternal => {
  return headerCell(1)
}

export const memoryHeader = (): ILocatorExternal => {
  return headerCell(2)
}

export const rows = (): ILocatorExternal => {
  return createLocator('.ProcessExplorerRow')
}

export const row = (index: number): ILocatorExternal => {
  return rows().nth(index)
}

export const focusedRow = (): ILocatorExternal => {
  return createLocator('.ProcessExplorerRowFocused')
}

export const expandedRow = (): ILocatorExternal => {
  return createLocator('.ProcessExplorerRow[aria-expanded="true"]').first()
}

export const collapsedRow = (): ILocatorExternal => {
  return createLocator('.ProcessExplorerRow[aria-expanded="false"]').first()
}

export const nameCell = (index: number): ILocatorExternal => {
  return row(index).locator('.ProcessExplorerNameCell')
}

export const pidCell = (index: number): ILocatorExternal => {
  return row(index).locator('.ProcessExplorerCell').nth(1)
}

export const memoryCell = (index: number): ILocatorExternal => {
  return row(index).locator('.ProcessExplorerCell').nth(2)
}

export const shouldBeOpen = async (): Promise<void> => {
  await expect(root()).toBeVisible()
  await expect(table()).toBeVisible()
}

export const shouldBeHealthy = async (): Promise<void> => {
  await expect(table()).toBeVisible()
  await expect(error()).toBeHidden()
}

export const shouldHaveHeaders = async (): Promise<void> => {
  await expect(nameHeader()).toHaveText('Name')
  await expect(pidHeader()).toHaveText('PID')
  await expect(memoryHeader()).toHaveText('Memory')
}

export const shouldHaveRow = async (index: number = 0): Promise<void> => {
  await expect(row(index)).toBeVisible()
  await expect(nameCell(index)).toBeVisible()
  await expect(pidCell(index)).toBeVisible()
  await expect(memoryCell(index)).toBeVisible()
}

export const shouldHaveFocusedRow = async (): Promise<void> => {
  await expect(focusedRow()).toBeVisible()
}

export const shouldHaveCollapsedRow = async (): Promise<void> => {
  await expect(collapsedRow()).toBeVisible()
}

export const shouldHaveExpandedRow = async (): Promise<void> => {
  await expect(expandedRow()).toBeVisible()
}
