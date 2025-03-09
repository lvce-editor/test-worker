import { test, expect, beforeEach, jest } from '@jest/globals'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as Editor from '../src/parts/TestFrameWorkComponentEditor/TestFrameWorkComponentEditor.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

beforeEach(() => {
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)
  mockRpc.invoke.mockReset()
})

test('setCursor', async () => {
  await Editor.setCursor(1, 2)
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.cursorSet', 1, 2)
})

test('openCompletion', async () => {
  await Editor.openCompletion()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.openCompletion')
})

test('closeCompletion', async () => {
  await Editor.closeCompletion()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.closeCompletion')
})

test('openEditorContextMenu', async () => {
  await Editor.openEditorContextMenu()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.handleContextMenu', 0, 0)
})

test('invokeTabCompletion', async () => {
  await Editor.invokeTabCompletion()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.tabCompletion')
})

test('invokeBraceCompletion', async () => {
  await Editor.invokeBraceCompletion('text')
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.braceCompletion', 'text')
})

test('cursorCharacterRight', async () => {
  await Editor.cursorCharacterRight()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.cursorCharacterRight')
})

test('cursorCharacterLeft', async () => {
  await Editor.cursorCharacterLeft()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.cursorCharacterLeft')
})

test('copyLineDown', async () => {
  await Editor.copyLineDown()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.copyLineDown')
})

test('cursorDown', async () => {
  await Editor.cursorDown()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.cursorDown')
})

test('cursorUp', async () => {
  await Editor.cursorUp()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.cursorUp')
})

test('cursorWordLeft', async () => {
  await Editor.cursorWordLeft()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.cursorWordLeft')
})

test('cursorWordRight', async () => {
  await Editor.cursorWordRight()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.cursorWordRight')
})

test('goToDefinition', async () => {
  await Editor.goToDefinition()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.goToDefinition')
})

test('openHover', async () => {
  await Editor.openHover()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.showHover2')
})

test('goToTypeDefinition', async () => {
  await Editor.goToTypeDefinition()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.goToTypeDefinition')
})

test('type', async () => {
  await Editor.type('text')
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.type', 'text')
})

test('findAllReferences', async () => {
  await Editor.findAllReferences()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('SideBar.show', 'References', true)
})

test('findAllImplementations', async () => {
  await Editor.findAllImplementations()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('SideBar.show', 'Implementations', true)
})

test('setSelections', async () => {
  await Editor.setSelections([])
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.setSelections', [])
})

test('openFindWidget', async () => {
  await Editor.openFindWidget()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.openFind')
})

test('setDeltaY', async () => {
  await Editor.setDeltaY(10)
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.setDeltaY', 10)
})

test('format', async () => {
  await Editor.format()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.format')
})

test('insertLineBreak', async () => {
  await Editor.insertLineBreak()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.insertLineBreak')
})

test('openSourceActions', async () => {
  await Editor.openSourceActions()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.showSourceActions2')
})

test('sourceActionsSelectCurrent', async () => {
  await Editor.sourceActionsSelectCurrent()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('EditorSourceActions.selectCurrent')
})

test('openCompletionDetails', async () => {
  await Editor.openCompletionDetails()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('EditorCompletion.openDetails')
})

test('closeCompletionDetails', async () => {
  await Editor.closeCompletionDetails()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('EditorCompletion.closeDetails')
})

test('toggleCompletionDetails', async () => {
  await Editor.toggleCompletionDetails()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('EditorCompletion.toggleDetails')
})

test('organizeImports', async () => {
  await Editor.organizeImports()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.organizeImports')
})

test('addAllMissingImports', async () => {
  await Editor.addAllMissingImports()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.addAllMissingImports')
})

test('sortImports', async () => {
  await Editor.sortImports()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.sortImports')
})

test('toggleLineComment', async () => {
  await Editor.toggleLineComment()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.toggleLineComment')
})

test('toggleBlockComment', async () => {
  await Editor.toggleBlockComment()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.toggleBlockComment')
})

test('selectAll', async () => {
  await Editor.selectAll()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.toggleBlockComment')
})

test('openColorPicker', async () => {
  await Editor.openColorPicker()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.openColorPicker')
})

test('openFind', async () => {
  await Editor.openFind()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.openFind2')
})

test('deleteAllLeft', async () => {
  await Editor.deleteAllLeft()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.deleteAllLeft')
})

test('deleteAllRight', async () => {
  await Editor.deleteAllRight()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.deleteAllRight')
})

test('cursorWordPartLeft', async () => {
  await Editor.cursorWordPartLeft()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.cursorWordPartLeft')
})

test('cursorWordPartRight', async () => {
  await Editor.cursorWordPartRight()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.cursorWordPartRight')
})

test('cursorEnd', async () => {
  await Editor.cursorEnd()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.cursorEnd')
})

test('cursorHome', async () => {
  await Editor.cursorHome()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.cursorHome')
})

test('copyLineUp', async () => {
  await Editor.copyLineUp()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.copyLineUp')
})

test('copy', async () => {
  await Editor.copy()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.copy')
})

test('closeColorPicker', async () => {
  await Editor.closeColorPicker()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.closeColorPicker')
})

test('openContextMenu', async () => {
  await Editor.openContextMenu()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.contextMenu', 0, 0, 0)
})

test('getText', async () => {
  mockRpc.invoke.mockResolvedValue('test text')
  const text = await Editor.getText()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.getText')
  expect(text).toBe('test text')
})

test('rename', async () => {
  await Editor.rename()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.rename')
})

test('showHover', async () => {
  await Editor.showHover()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.showHover2')
})

test('openRename', async () => {
  await Editor.openRename()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.openRename')
})

test('shouldHaveText', async () => {
  mockRpc.invoke.mockResolvedValue('test text')
  await Editor.shouldHaveText('test text')
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.getText')
})

test('shouldHaveText - throws error when text does not match', async () => {
  mockRpc.invoke.mockResolvedValue('wrong text')
  await expect(Editor.shouldHaveText('test text')).rejects.toThrow('Expected editor to have text test text but was wrong text')
})
