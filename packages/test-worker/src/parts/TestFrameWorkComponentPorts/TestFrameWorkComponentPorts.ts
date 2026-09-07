import type { ILocatorExternal } from '../ILocatorExternal/ILocatorExternal.ts'
import type { PortInput } from '../PortInput/PortInput.ts'
import { createLocator } from '../CreateLocator/CreateLocator.ts'
import * as DirectViewWorker from '../DirectViewWorker/DirectViewWorker.ts'
import * as Panel from '../TestFrameWorkComponentPanel/TestFrameWorkComponentPanel.ts'

export const open = async (): Promise<void> => {
  await Panel.open('Ports')
}

export const setPorts = async (ports: readonly PortInput[]): Promise<void> => {
  await DirectViewWorker.invoke('Ports', 'Ports.setPorts', ports)
}

export const startAddPort = async (): Promise<void> => {
  await DirectViewWorker.invoke('Ports', 'Ports.startAddPort')
}

export const handleAddPortInput = async (value: string): Promise<void> => {
  await DirectViewWorker.invoke('Ports', 'Ports.handleAddPortInput', value)
}

export const submitAddPort = async (): Promise<void> => {
  await DirectViewWorker.invoke('Ports', 'Ports.submitAddPort')
}

export const cancelAddPort = async (): Promise<void> => {
  await DirectViewWorker.invoke('Ports', 'Ports.cancelAddPort')
}

export const removePort = async (port: number): Promise<void> => {
  await DirectViewWorker.invoke('Ports', 'Ports.removePort', port)
}

export const togglePortActive = async (port: number): Promise<void> => {
  await DirectViewWorker.invoke('Ports', 'Ports.togglePortActive', port)
}

export const focusNext = async (): Promise<void> => {
  await DirectViewWorker.invoke('Ports', 'Ports.focusNext')
}

export const focusPrevious = async (): Promise<void> => {
  await DirectViewWorker.invoke('Ports', 'Ports.focusPrevious')
}

export const setDeltaY = async (deltaY: number): Promise<void> => {
  await DirectViewWorker.invoke('Ports', 'Ports.setDeltaY', deltaY)
}

export const addPort = async (value: string): Promise<void> => {
  await startAddPort()
  await handleAddPortInput(value)
  await submitAddPort()
}

export const root = (): ILocatorExternal => {
  return createLocator('.Ports')
}

export const rows = (): ILocatorExternal => {
  return root().locator('.PortsTableBody .PortsTableRow')
}

export const row = (index: number): ILocatorExternal => {
  return rows().nth(index)
}

export const headers = (): ILocatorExternal => {
  return root().locator('.PortsTableHeader .PortsTableCell')
}

export const focusedPort = (): ILocatorExternal => {
  return root().locator('.PortsTableRow.Focused .PortsPortColumn')
}

export const emptyMessage = (): ILocatorExternal => {
  return root().locator('.PortsEmpty')
}

export const addInput = (): ILocatorExternal => {
  return root().locator('.AddPortInput')
}

export const addButton = (): ILocatorExternal => {
  return root().locator('.AddPortButton')
}

export const addError = (): ILocatorExternal => {
  return root().locator('.AddPortError')
}

export const portCell = (index: number): ILocatorExternal => {
  return row(index).locator('.PortsPortColumn')
}

export const addressLink = (index: number): ILocatorExternal => {
  return row(index).locator('.PortsAddressLink')
}

export const processCell = (index: number): ILocatorExternal => {
  return row(index).locator('.PortsProcessColumn')
}

export const originCell = (index: number): ILocatorExternal => {
  return row(index).locator('.PortsOriginColumn')
}

export const statusButton = (index: number): ILocatorExternal => {
  return row(index).locator('.PortsStatusButton')
}

export const activeIcon = (index: number): ILocatorExternal => {
  return row(index).locator('.PortsStatusIconActive')
}

export const inactiveIcon = (index: number): ILocatorExternal => {
  return row(index).locator('.PortsStatusIconInactive')
}
