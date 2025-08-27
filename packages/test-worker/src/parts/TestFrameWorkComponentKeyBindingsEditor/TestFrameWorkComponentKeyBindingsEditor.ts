import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const open = async (): Promise<void> => {
  await RendererWorker.invoke('Main.openUri', 'app://keybindings')
}

export const handleInput = (value: string): Promise<void> => {
  return RendererWorker.invoke('KeyBindings.handleInput', value)
}

export const handleClick = (x: number, y: number): Promise<void> => {
  return RendererWorker.invoke('KeyBindings.handleClick', x, y)
}

export const handleWheel = (deltaMode: number, deltaY: number): Promise<void> => {
  return RendererWorker.invoke('KeyBindings.handleWheel', deltaMode, deltaY)
}

export const handleDoubleClick = (x: number, y: number): Promise<void> => {
  return RendererWorker.invoke('KeyBindings.handleDoubleClick', x, y)
}

export const focusNext = (): Promise<void> => {
  return RendererWorker.invoke('KeyBindings.focusNext')
}

export const focusPrevious = (): Promise<void> => {
  return RendererWorker.invoke('KeyBindings.focusPrevious')
}

export const focusFirst = (): Promise<void> => {
  return RendererWorker.invoke('KeyBindings.focusFirst')
}

export const focusIndex = (index: number): Promise<void> => {
  // @ts-ignore
  return RendererWorker.invoke('KeyBindings.focusIndex', index)
}

export const focusLast = (): Promise<void> => {
  return RendererWorker.invoke('KeyBindings.focusLast')
}

export const toggleRecordingKeys = (): Promise<void> => {
  return RendererWorker.invoke('KeyBindings.toggleRecordingKeys')
}

export const startRecordingKeys = (): Promise<void> => {
  return RendererWorker.invoke('KeyBindings.startRecordingKeys')
}

export const clearInput = (): Promise<void> => {
  return RendererWorker.invoke('KeyBindings.clearInput')
}

export const sortByPrecedence = (): Promise<void> => {
  return RendererWorker.invoke('KeyBindings.sortByPrecedence')
}

export const stopRecordingKeys = (): Promise<void> => {
  return RendererWorker.invoke('KeyBindings.stopRecordingKeys')
}

export const handleContextMenu = (button: number, x: number, y: number): Promise<void> => {
  return RendererWorker.invoke('KeyBindings.handleContextMenu', button, x, y)
}

export const copyCommandId = (): Promise<void> => {
  return RendererWorker.invoke('KeyBindings.copyCommandId')
}

export const copyCommandTitle = (): Promise<void> => {
  return RendererWorker.invoke('KeyBindings.copyCommandTitle')
}

export const addKeyBinding = (): Promise<void> => {
  return RendererWorker.invoke('KeyBindings.addKeyBinding')
}

export const removeKeyBinding = (): Promise<void> => {
  return RendererWorker.invoke('KeyBindings.removeKeyBinding')
}

export const changeWhenExpression = (): Promise<void> => {
  return RendererWorker.invoke('KeyBindings.changeWhenExpression')
}

export const showSameKeyBindings = (): Promise<void> => {
  return RendererWorker.invoke('KeyBindings.showSameKeyBindings')
}

export const resetKeyBinding = (): Promise<void> => {
  return RendererWorker.invoke('KeyBindings.resetKeyBinding')
}
