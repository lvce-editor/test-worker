import { RendererWorker } from '@lvce-editor/rpc-registry'

export const show = async (): Promise<void> => {
  await RendererWorker.invoke('Main.openUri', 'running-extensions:///1')
}

export const handleContextMenu = async (index: number, x: number = 0, y: number = 0): Promise<void> => {
  await RendererWorker.invoke('RunningExtensions.handleContextMenu', index, x, y)
}

export const copyId = async (index: number): Promise<void> => {
  await RendererWorker.invoke('RunningExtensions.copyId', index)
}

export const disable = async (index: number): Promise<void> => {
  await RendererWorker.invoke('RunningExtensions.disable', index)
}

export const disableWorkspace = async (index: number): Promise<void> => {
  await RendererWorker.invoke('RunningExtensions.disableWorkspace', index)
}

export const reportIssue = async (index: number): Promise<void> => {
  await RendererWorker.invoke('RunningExtensions.reportIssue', index)
}

export const startProfile = async (): Promise<void> => {
  await RendererWorker.invoke('RunningExtensions.startProfile')
}
