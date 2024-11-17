import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const setCursor = async (rowIndex: number, columnIndex: number): Promise<void> => {
  await Rpc.invoke('Editor.cursorSet', rowIndex, columnIndex)
}

export const openCompletion = async (): Promise<void> => {
  await Rpc.invoke('Editor.openCompletion')
}

export const openEditorContextMenu = async () => {
  await Rpc.invoke('Editor.handleContextMenu', 0, 0)
}

export const invokeTabCompletion = async () => {
  await Rpc.invoke('Editor.tabCompletion')
}

export const executeTabCompletion = async () => {
  await Rpc.invoke('Editor.tabCompletion')
}

export const invokeBraceCompletion = async (text: string) => {
  await Rpc.invoke('Editor.braceCompletion', text)
}

export const cursorCharacterRight = async () => {
  await Rpc.invoke('Editor.cursorCharacterRight')
}

export const cursorCharacterLeft = async () => {
  await Rpc.invoke('Editor.cursorCharacterLeft')
}

export const copyLineDown = async () => {
  await Rpc.invoke('Editor.copyLineDown')
}

export const cursorDown = async () => {
  await Rpc.invoke('Editor.cursorDown')
}

export const cursorUp = async () => {
  await Rpc.invoke('Editor.cursorUp')
}

export const cursorWordLeft = async () => {
  await Rpc.invoke('Editor.cursorWordLeft')
}

export const cursorWordRight = async () => {
  await Rpc.invoke('Editor.cursorWordRight')
}

export const goToDefinition = async () => {
  await Rpc.invoke('Editor.goToDefinition')
}

export const openHover = async () => {
  await Rpc.invoke('Editor.showHover2')
}

export const goToTypeDefinition = async () => {
  await Rpc.invoke('Editor.goToTypeDefinition')
}

export const type = async (text: string) => {
  await Rpc.invoke('Editor.type')
}

export const findAllReferences = async () => {
  await Rpc.invoke('SideBar.show', 'References', /* focus */ true)
}

export const findAllImplementations = async () => {
  await Rpc.invoke('SideBar.show', 'Implementations', /* focus */ true)
}

export const setSelections = async (selections: any) => {
  await Rpc.invoke('Editor.setSelections', selections)
}

export const openFindWidget = async () => {
  await Rpc.invoke('Editor.openFind')
}

export const setDeltaY = async (deltaY: number) => {
  await Rpc.invoke('Editor.setDeltaY', deltaY)
}

export const format = async () => {
  await Rpc.invoke('Editor.format')
}

export const insertLineBreak = async () => {
  await Rpc.invoke('Editor.insertLineBreak')
}

export const openSourceActions = async () => {
  await Rpc.invoke('Editor.showSourceActions2')
}

export const sourceActionsSelectCurrent = async () => {
  await Rpc.invoke('EditorSourceActions.selectCurrent')
}

export const openCompletionDetails = async () => {
  await Rpc.invoke('EditorCompletion.openDetails')
}

export const closeCompletionDetails = async () => {
  await Rpc.invoke('EditorCompletion.closeDetails')
}

export const toggleCompletionDetails = async () => {
  await Rpc.invoke('EditorCompletion.toggleDetails')
}

export const organizeImports = async () => {
  await Rpc.invoke('Editor.organizeImports')
}

export const addAllMissingImports = async () => {
  await Rpc.invoke('Editor.addAllMissingImports')
}

export const sortImports = async () => {
  await Rpc.invoke('Editor.sortImports')
}

export const toggleLineComment = async () => {
  await Rpc.invoke('Editor.toggleLineComment')
}

export const toggleBlockComment = async () => {
  await Rpc.invoke('Editor.toggleBlockComment')
}

export const selectAll = async () => {
  await Rpc.invoke('Editor.toggleBlockComment')
}

export const openColorPicker = async () => {
  await Rpc.invoke('Editor.openColorPicker')
}

export const openFind = async () => {
  await Rpc.invoke('Editor.openFind2')
}

export const deleteAllLeft = async () => {
  await Rpc.invoke('Editor.deleteAllLeft')
}

export const deleteAllRight = async () => {
  await Rpc.invoke('Editor.deleteAllRight')
}

export const cursorWordPartLeft = async () => {
  await Rpc.invoke('Editor.cursorWordPartLeft')
}

export const cursorWordPartRight = async () => {
  await Rpc.invoke('Editor.cursorWordPartRight')
}

export const cursorEnd = async () => {
  await Rpc.invoke('Editor.cursorEnd')
}

export const cursorHome = async () => {
  await Rpc.invoke('Editor.cursorHome')
}

export const copyLineUp = async () => {
  await Rpc.invoke('Editor.copyLineUp')
}

export const copy = async () => {
  await Rpc.invoke('Editor.copy')
}

export const closeColorPicker = async () => {
  await Rpc.invoke('Editor.closeColorPicker')
}

export const openContextMenu = async () => {
  await Rpc.invoke('Editor.contextMenu')
}

export const getText = async () => {
  return Rpc.invoke('Editor.getText')
}

export const rename = async () => {
  await Rpc.invoke('Editor.rename')
}

export const showHover = async () => {
  await Rpc.invoke('Editor.showHover2')
}

export const openRename = async () => {
  await Rpc.invoke('Editor.openRename')
}
