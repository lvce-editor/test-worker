import { InputSource } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'

export const open = async (): Promise<void> => {
  await RendererWorker.invoke('SideBar.openViewlet', 'Extensions')
}

export const handleInput = async (value: string): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Extensions.handleInput', value, InputSource.Script)
}

export const handleContextMenu = async (button: number, x: number, y: number): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Extensions.handleContextMenu', button, x, y)
}
