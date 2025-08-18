import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const setCursor = async (rowIndex: number, columnIndex: number): Promise<void> => {
  await Rpc.invoke('Editor.cursorSet', rowIndex, columnIndex)
}

export const openCompletion = async (): Promise<void> => {
  await Rpc.invoke('Editor.openCompletion')
}

export const closeCompletion = async (): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('EditorCompletion.close')
}

export const openEditorContextMenu = async (): Promise<void> => {
  await Rpc.invoke('Editor.handleContextMenu', 0, 0)
}

export const invokeTabCompletion = async (): Promise<void> => {
  await Rpc.invoke('Editor.tabCompletion')
}

export const executeTabCompletion = async (): Promise<void> => {
  await Rpc.invoke('Editor.tabCompletion')
}

export const invokeBraceCompletion = async (text: string): Promise<void> => {
  await Rpc.invoke('Editor.braceCompletion', text)
}

export const cursorCharacterRight = async (): Promise<void> => {
  await Rpc.invoke('Editor.cursorCharacterRight')
}

export const cursorCharacterLeft = async (): Promise<void> => {
  await Rpc.invoke('Editor.cursorCharacterLeft')
}

export const copyLineDown = async (): Promise<void> => {
  await Rpc.invoke('Editor.copyLineDown')
}

export const cursorDown = async (): Promise<void> => {
  await Rpc.invoke('Editor.cursorDown')
}

export const cursorUp = async (): Promise<void> => {
  await Rpc.invoke('Editor.cursorUp')
}

export const cursorWordLeft = async (): Promise<void> => {
  await Rpc.invoke('Editor.cursorWordLeft')
}

export const cursorWordRight = async (): Promise<void> => {
  await Rpc.invoke('Editor.cursorWordRight')
}

export const goToDefinition = async (): Promise<void> => {
  await Rpc.invoke('Editor.goToDefinition')
}

export const openHover = async (): Promise<void> => {
  await Rpc.invoke('Editor.showHover2')
}

export const goToTypeDefinition = async (): Promise<void> => {
  await Rpc.invoke('Editor.goToTypeDefinition')
}

export const type = async (text: string): Promise<void> => {
  await Rpc.invoke('Editor.type', text)
}

export const findAllReferences = async (): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('SideBar.show', 'References', /* focus */ true)
}

export const findAllImplementations = async (): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('SideBar.show', 'Implementations', /* focus */ true)
}

export const setSelections = async (selections: any): Promise<void> => {
  await Rpc.invoke('Editor.setSelections', selections)
}

export const openFindWidget = async (): Promise<void> => {
  await Rpc.invoke('Editor.openFind')
}

export const setDeltaY = async (deltaY: number): Promise<void> => {
  await Rpc.invoke('Editor.setDeltaY', deltaY)
}

export const format = async (): Promise<void> => {
  await Rpc.invoke('Editor.format')
}

export const insertLineBreak = async (): Promise<void> => {
  await Rpc.invoke('Editor.insertLineBreak')
}

export const openSourceActions = async (): Promise<void> => {
  await Rpc.invoke('Editor.showSourceActions2')
}

export const sourceActionsSelectCurrent = async (): Promise<void> => {
  await Rpc.invoke('EditorSourceActions.selectCurrent')
}

export const openCompletionDetails = async (): Promise<void> => {
  await Rpc.invoke('EditorCompletion.openDetails')
}

export const closeCompletionDetails = async (): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('EditorCompletion.closeDetails')
}

export const toggleCompletionDetails = async (): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('EditorCompletion.toggleDetails')
}

export const organizeImports = async (): Promise<void> => {
  await Rpc.invoke('Editor.organizeImports')
}

export const addAllMissingImports = async (): Promise<void> => {
  await Rpc.invoke('Editor.addAllMissingImports')
}

export const sortImports = async (): Promise<void> => {
  await Rpc.invoke('Editor.sortImports')
}

export const toggleLineComment = async (): Promise<void> => {
  await Rpc.invoke('Editor.toggleLineComment')
}

export const toggleBlockComment = async (): Promise<void> => {
  await Rpc.invoke('Editor.toggleBlockComment')
}

export const selectAll = async (): Promise<void> => {
  await Rpc.invoke('Editor.toggleBlockComment')
}

export const openColorPicker = async (): Promise<void> => {
  await Rpc.invoke('Editor.openColorPicker')
}

export const openFind = async (): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Editor.openFind2')
}

export const deleteAllLeft = async (): Promise<void> => {
  await Rpc.invoke('Editor.deleteAllLeft')
}

export const deleteAllRight = async (): Promise<void> => {
  await Rpc.invoke('Editor.deleteAllRight')
}

export const cursorWordPartLeft = async (): Promise<void> => {
  await Rpc.invoke('Editor.cursorWordPartLeft')
}

export const cursorWordPartRight = async (): Promise<void> => {
  await Rpc.invoke('Editor.cursorWordPartRight')
}

export const cursorEnd = async (): Promise<void> => {
  await Rpc.invoke('Editor.cursorEnd')
}

export const cursorHome = async (): Promise<void> => {
  await Rpc.invoke('Editor.cursorHome')
}

export const copyLineUp = async (): Promise<void> => {
  await Rpc.invoke('Editor.copyLineUp')
}

export const copy = async (): Promise<void> => {
  await Rpc.invoke('Editor.copy')
}

export const closeColorPicker = async (): Promise<void> => {
  await Rpc.invoke('Editor.closeColorPicker')
}

export const openContextMenu = async (): Promise<void> => {
  const button = 0
  const x = 0
  const y = 0
  await Rpc.invoke('Editor.contextMenu', button, x, y)
}

export const getText = async (): Promise<string> => {
  return Rpc.invoke('Editor.getText')
}

export const rename = async (): Promise<void> => {
  await Rpc.invoke('Editor.rename')
}

export const showHover = async (): Promise<void> => {
  await Rpc.invoke('Editor.showHover2')
}

export const openRename = async (): Promise<void> => {
  await Rpc.invoke('Editor.openRename')
}

export const growSelection = async (): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Editor.selectionGrow')
}

export const getSelections = async (): Promise<Uint32Array> => {
  // @ts-ignore
  return Rpc.invoke('Editor.getSelections')
}

export const shouldHaveText = async (expectedText: string): Promise<void> => {
  const text = await Rpc.invoke('Editor.getText')
  if (text !== expectedText) {
    throw new Error(`Expected editor to have text ${expectedText} but was ${text}`)
  }
}
