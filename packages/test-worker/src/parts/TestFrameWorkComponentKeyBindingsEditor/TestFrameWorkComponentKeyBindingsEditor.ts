import * as DirectViewWorker from '../DirectViewWorker/DirectViewWorker.ts'

export const open = async (): Promise<void> => {
  await DirectViewWorker.invoke('MainArea', 'Main.openUri', 'app://keybindings')
}

export const handleInput = (value: string): Promise<void> => {
  return DirectViewWorker.invoke('KeyBindings', 'KeyBindings.handleInput', value)
}

export const handleClick = (x: number, y: number): Promise<void> => {
  return DirectViewWorker.invoke('KeyBindings', 'KeyBindings.handleClick', x, y)
}

export const handleWheel = (deltaMode: number, deltaY: number): Promise<void> => {
  return DirectViewWorker.invoke('KeyBindings', 'KeyBindings.handleWheel', deltaMode, deltaY)
}

export const handleDoubleClick = (x: number, y: number): Promise<void> => {
  return DirectViewWorker.invoke('KeyBindings', 'KeyBindings.handleDoubleClick', x, y)
}

export const focusNext = (): Promise<void> => {
  return DirectViewWorker.invoke('KeyBindings', 'KeyBindings.focusNext')
}

export const focusPrevious = (): Promise<void> => {
  return DirectViewWorker.invoke('KeyBindings', 'KeyBindings.focusPrevious')
}

export const focusFirst = (): Promise<void> => {
  return DirectViewWorker.invoke('KeyBindings', 'KeyBindings.focusFirst')
}

export const focusIndex = (index: number): Promise<void> => {
  return DirectViewWorker.invoke('KeyBindings', 'KeyBindings.focusIndex', index)
}

export const focusLast = (): Promise<void> => {
  return DirectViewWorker.invoke('KeyBindings', 'KeyBindings.focusLast')
}

export const toggleRecordingKeys = (): Promise<void> => {
  return DirectViewWorker.invoke('KeyBindings', 'KeyBindings.toggleRecordingKeys')
}

export const startRecordingKeys = (): Promise<void> => {
  return DirectViewWorker.invoke('KeyBindings', 'KeyBindings.startRecordingKeys')
}

export const clearInput = (): Promise<void> => {
  return DirectViewWorker.invoke('KeyBindings', 'KeyBindings.clearInput')
}

export const sortByPrecedence = (): Promise<void> => {
  return DirectViewWorker.invoke('KeyBindings', 'KeyBindings.sortByPrecedence')
}

export const stopRecordingKeys = (): Promise<void> => {
  return DirectViewWorker.invoke('KeyBindings', 'KeyBindings.stopRecordingKeys')
}

export const handleContextMenu = (button: number, x: number, y: number): Promise<void> => {
  return DirectViewWorker.invoke('KeyBindings', 'KeyBindings.handleContextMenu', button, x, y)
}

export const copyCommandId = (): Promise<void> => {
  return DirectViewWorker.invoke('KeyBindings', 'KeyBindings.copyCommandId')
}

export const copyCommandTitle = (): Promise<void> => {
  return DirectViewWorker.invoke('KeyBindings', 'KeyBindings.copyCommandTitle')
}

export const addKeyBinding = (): Promise<void> => {
  return DirectViewWorker.invoke('KeyBindings', 'KeyBindings.addKeyBinding')
}

export const removeKeyBinding = (): Promise<void> => {
  return DirectViewWorker.invoke('KeyBindings', 'KeyBindings.removeKeyBinding')
}

export const changeWhenExpression = (): Promise<void> => {
  return DirectViewWorker.invoke('KeyBindings', 'KeyBindings.changeWhenExpression')
}

export const showSameKeyBindings = (): Promise<void> => {
  return DirectViewWorker.invoke('KeyBindings', 'KeyBindings.showSameKeyBindings')
}

export const resetKeyBinding = (): Promise<void> => {
  return DirectViewWorker.invoke('KeyBindings', 'KeyBindings.resetKeyBinding')
}
