import { RendererWorker as Rpc } from '@lvce-editor/rpc-registry'

export const handleClickSectionWatch = async (): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Run And Debug.handleClickSectionWatch')
}

export const addWatchExpression = async (expression: string): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Run And Debug.addWatchExpression', expression)
}

export const handleWatchValueChange = async (): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Run And Debug.handleWatchValueChange')
}

export const acceptWatchExpressionEdit = async (): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Run And Debug.acceptWatchExpressionEdit')
}

export const selectIndex = async (index: number): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Run And Debug.selectIndex', index)
}

export const setPauseOnExceptions = async (value: number): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Run And Debug.setPauseOnExceptions', value)
}

export const handleRename = async (): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Run And Debug.handleRename')
}

export const handleSpace = async (): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Run And Debug.handleSpace')
}
