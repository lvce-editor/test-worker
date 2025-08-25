import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const open = async (id: string): Promise<void> => {
  await RendererWorker.invoke('Layout.showPanel', id)
}

export const openProblems = async (): Promise<void> => {
  await open('Problems')
  // @ts-ignore
  await RendererWorker.invoke('Panel.selectIndex', 0)
}
