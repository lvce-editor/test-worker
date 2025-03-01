import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const open = async (): Promise<void> => {
  await Rpc.invoke('Main.openUri', 'app://keybindings')
}

export const handleInput = (value: string): Promise<void> => {
  return Rpc.invoke('KeyBindings.handleInput', value)
}

export const handleClick = (x: number, y: number): Promise<void> => {
  return Rpc.invoke('KeyBindings.handleClick', x, y)
}

export const handleWheel = (deltaMode: number, deltaY: number): Promise<void> => {
  return Rpc.invoke('KeyBindings.handleWheel', deltaMode, deltaY)
}

export const handleDoubleClick = (x: number, y: number): Promise<void> => {
  return Rpc.invoke('KeyBindings.handleDoubleClick', x, y)
}

export const focusNext = (): Promise<void> => {
  return Rpc.invoke('KeyBindings.focusNext')
}

export const focusPrevious = (): Promise<void> => {
  return Rpc.invoke('KeyBindings.focusPrevious')
}

export const focusFirst = (): Promise<void> => {
  return Rpc.invoke('KeyBindings.focusFirst')
}

export const focusLast = (): Promise<void> => {
  return Rpc.invoke('KeyBindings.focusLast')
}

export const toggleRecordingKeys = (): Promise<void> => {
  return Rpc.invoke('KeyBindings.toggleRecordingKeys')
}

export const startRecordingKeys = (): Promise<void> => {
  return Rpc.invoke('KeyBindings.startRecordingKeys')
}

export const clearInput = (): Promise<void> => {
  return Rpc.invoke('KeyBindings.clearInput')
}

export const sortByPrecedence = (): Promise<void> => {
  return Rpc.invoke('KeyBindings.sortByPrecedence')
}

export const stopRecordingKeys = (): Promise<void> => {
  return Rpc.invoke('KeyBindings.stopRecordingKeys')
}

export const handleContextMenu = (button: number, x: number, y: number): Promise<void> => {
  return Rpc.invoke('KeyBindings.handleContextMenu', button, x, y)
}

export const copyCommandId = (): Promise<void> => {
  return Rpc.invoke('KeyBindings.copyCommandId')
}

export const copyCommandTitle = (): Promise<void> => {
  return Rpc.invoke('KeyBindings.copyCommandTitle')
}

export const addKeyBinding = (): Promise<void> => {
  return Rpc.invoke('KeyBindings.addKeyBinding')
}

export const removeKeyBinding = (): Promise<void> => {
  return Rpc.invoke('KeyBindings.removeKeyBinding')
}

export const changeWhenExpression = (): Promise<void> => {
  return Rpc.invoke('KeyBindings.changeWhenExpression')
}

export const showSameKeyBindings = (): Promise<void> => {
  return Rpc.invoke('KeyBindings.showSameKeyBindings')
}

export const resetKeyBinding = (): Promise<void> => {
  return Rpc.invoke('KeyBindings.resetKeyBinding')
}
