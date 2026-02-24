import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import type { Diagnostic } from '../Diagnostic/Diagnostic.ts'
import { areDiagnosticsEqual } from '../AreDiagnosticsEqual/AreDiagnosticsEqual.ts'
import { areSelectionsEqual } from '../AreSelectionsEqual/AreSelectionsEqual.ts'
import { getEditorKey } from '../GetEditorKey/GetEditorKey.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as Settings from '../TestFrameWorkComponentSettings/TestFrameWorkComponentSettings.ts'

export const setCursor = async (rowIndex: number, columnIndex: number): Promise<void> => {
  await RendererWorker.invoke('Editor.cursorSet', rowIndex, columnIndex)
}

export const openCompletion = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.openCompletion')
}

export const closeCompletion = async (): Promise<void> => {
  await RendererWorker.invoke('EditorCompletion.close')
}

export const openEditorContextMenu = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.handleContextMenu', 0, 0)
}

export const invokeTabCompletion = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.tabCompletion')
}

export const executeTabCompletion = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.tabCompletion')
}

export const invokeBraceCompletion = async (text: string): Promise<void> => {
  await RendererWorker.invoke('Editor.braceCompletion', text)
}

export const cursorCharacterRight = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.cursorCharacterRight')
}

export const cursorCharacterLeft = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.cursorCharacterLeft')
}

export const copyLineDown = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.copyLineDown')
}

export const cursorDown = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.cursorDown')
}

export const selectDown = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.selectDown')
}

export const selectAllLeft = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.selectAllLeft')
}

export const selectionGrow = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.selectionGrow')
}

export const selectAllRight = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.selectAllRight')
}

export const selectAllOccurrences = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.selectAllOccurrences')
}

export const selectUp = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.selectUp')
}

export const cursorUp = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.cursorUp')
}

export const cursorWordLeft = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.cursorWordLeft')
}

export const setText = async (text: string): Promise<void> => {
  await RendererWorker.invoke('Editor.setText', text)
}

export const deleteAll = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.deleteAll')
}

export const cursorWordRight = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.cursorWordRight')
}

export const goToDefinition = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.goToDefinition')
}

export const openHover = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.showHover2')
}

export const goToTypeDefinition = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.goToTypeDefinition')
}

export const type = async (text: string): Promise<void> => {
  await RendererWorker.invoke('Editor.type', text)
}

export const findAllReferences = async (): Promise<void> => {
  await RendererWorker.invoke('SideBar.show', 'References', /* focus */ true)
}

export const findAllImplementations = async (): Promise<void> => {
  await RendererWorker.invoke('SideBar.show', 'Implementations', /* focus */ true)
}

export const setSelections = async (selections: any): Promise<void> => {
  await RendererWorker.invoke('Editor.setSelections', selections)
}

export const selectNextOccurrence = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.selectNextOccurrence')
}

export const selectPreviousOccurrence = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.selectPreviousOccurrence')
}

export const openFindWidget = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.openFind')
}

export const setDeltaY = async (deltaY: number): Promise<void> => {
  await RendererWorker.invoke('Editor.setDeltaY', deltaY)
}

export const format = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.format')
}

export const unIndent = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.unIndent')
}

export const insertLineBreak = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.insertLineBreak')
}

export const openSourceActions = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.showSourceActions2')
}

export const sourceActionsSelectCurrent = async (): Promise<void> => {
  await RendererWorker.invoke('EditorSourceActions.selectCurrent')
}

export const openCompletionDetails = async (): Promise<void> => {
  await RendererWorker.invoke('EditorCompletion.openDetails')
}

export const closeCompletionDetails = async (): Promise<void> => {
  await RendererWorker.invoke('EditorCompletion.closeDetails')
}

export const toggleCompletionDetails = async (): Promise<void> => {
  await RendererWorker.invoke('EditorCompletion.toggleDetails')
}

export const organizeImports = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.organizeImports')
}

export const addAllMissingImports = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.addAllMissingImports')
}

export const sortImports = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.sortImports')
}

export const toggleLineComment = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.toggleLineComment')
}

export const toggleBlockComment = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.toggleBlockComment')
}

export const selectAll = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.toggleBlockComment')
}

export const openColorPicker = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.openColorPicker')
}

export const openFind = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.openFind2')
}

export const deleteAllLeft = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.deleteAllLeft')
}

export const deleteAllRight = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.deleteAllRight')
}

export const cursorWordPartLeft = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.cursorWordPartLeft')
}

export const cursorWordPartRight = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.cursorWordPartRight')
}

export const cursorEnd = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.cursorEnd')
}

export const cursorHome = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.cursorHome')
}

export const copyLineUp = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.copyLineUp')
}

export const copy = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.copy')
}

export const closeColorPicker = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.closeColorPicker')
}

export const openContextMenu = async (): Promise<void> => {
  const button = 0
  const x = 0
  const y = 0
  await RendererWorker.invoke('Editor.contextMenu', button, x, y)
}

export const getText = async (): Promise<string> => {
  return RendererWorker.invoke('Editor.getText')
}

export const rename = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.rename')
}

export const showHover = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.showHover2')
}

export const openRename = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.openRename')
}

export const rename2 = async (newName: string): Promise<void> => {
  await openRename()

  await RendererWorker.invoke('EditorRename.handleInput', newName, InputSource.Script)

  await RendererWorker.invoke('EditorRename.accept')
}

export const growSelection = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.selectionGrow')
}

export const getSelections = async (): Promise<Uint32Array> => {
  const key = await getEditorKey()

  return EditorWorker.invoke('Editor.getSelections', key)
}

export const shouldHaveText = async (expectedText: string): Promise<void> => {
  const key = await getEditorKey()
  const text = await EditorWorker.invoke('Editor.getText', key)
  if (text !== expectedText) {
    throw new Error(`Expected editor to have text ${expectedText} but was ${text}`)
  }
}

export const shouldHaveSelections = async (expectedSelections: Uint32Array): Promise<void> => {
  const key = await getEditorKey()
  const selections = await EditorWorker.invoke('Editor.getSelections', key)
  if (!areSelectionsEqual(selections, expectedSelections)) {
    throw new Error(`Expected editor to have selections ${expectedSelections} but was ${selections}`)
  }
}

export const undo = async (): Promise<void> => {
  await EditorWorker.invoke('Editor.undo')
}

export const redo = async (): Promise<void> => {
  await EditorWorker.invoke('Editor.redo')
}

export const shouldHaveDiagnostics = async (expectedDiagnostics: readonly Diagnostic[]): Promise<void> => {
  const key = await getEditorKey()
  const diagnostics = await EditorWorker.invoke('Editor.getDiagnostics', key)
  if (!areDiagnosticsEqual(diagnostics, expectedDiagnostics)) {
    const stringifiedActual = JSON.stringify(diagnostics)
    const stringifiedExpected = JSON.stringify(expectedDiagnostics)
    throw new Error(`Expected editor to have diagnostics ${stringifiedExpected} but was ${stringifiedActual}`)
  }
}

export const enableCompletionsOnType = async (): Promise<void> => {
  await Settings.update({
    'editor.completionsOnType': true,
  })
}

export const disableCompletionsOnType = async (): Promise<void> => {
  await Settings.update({
    'editor.completionsOnType': false,
  })
}

export const enableDiagnostics = async (): Promise<void> => {
  await Settings.update({
    'editor.diagnostics': true,
  })
}

export const disableDiagnostics = async (): Promise<void> => {
  await Settings.update({
    'editor.diagnostics': false,
  })
}
