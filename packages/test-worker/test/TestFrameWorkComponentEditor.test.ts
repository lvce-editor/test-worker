import { expect, test } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Editor from '../src/parts/TestFrameWorkComponentEditor/TestFrameWorkComponentEditor.ts'

test('setCursor', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet'() {
      return undefined
    },
  })

  await Editor.setCursor(1, 2)
  expect(mockRpc.invocations).toEqual([['Editor.cursorSet', 1, 2]])
})

test('openCompletion', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.openCompletion'() {
      return undefined
    },
  })

  await Editor.openCompletion()
  expect(mockRpc.invocations).toEqual([['Editor.openCompletion']])
})

test('closeCompletion', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'EditorCompletion.close'() {
      return undefined
    },
  })

  await Editor.closeCompletion()
  expect(mockRpc.invocations).toEqual([['EditorCompletion.close']])
})

test('openEditorContextMenu', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.handleContextMenu'() {
      return undefined
    },
  })

  await Editor.openEditorContextMenu()
  expect(mockRpc.invocations).toEqual([['Editor.handleContextMenu', 0, 0]])
})

test('invokeTabCompletion', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.tabCompletion'() {
      return undefined
    },
  })

  await Editor.invokeTabCompletion()
  expect(mockRpc.invocations).toEqual([['Editor.tabCompletion']])
})

test('invokeBraceCompletion', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.braceCompletion'() {
      return undefined
    },
  })

  await Editor.invokeBraceCompletion('text')
  expect(mockRpc.invocations).toEqual([['Editor.braceCompletion', 'text']])
})

test('cursorCharacterRight', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorCharacterRight'() {
      return undefined
    },
  })

  await Editor.cursorCharacterRight()
  expect(mockRpc.invocations).toEqual([['Editor.cursorCharacterRight']])
})

test('cursorCharacterLeft', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorCharacterLeft'() {
      return undefined
    },
  })

  await Editor.cursorCharacterLeft()
  expect(mockRpc.invocations).toEqual([['Editor.cursorCharacterLeft']])
})

test('copyLineDown', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.copyLineDown'() {
      return undefined
    },
  })

  await Editor.copyLineDown()
  expect(mockRpc.invocations).toEqual([['Editor.copyLineDown']])
})

test('cursorDown', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorDown'() {
      return undefined
    },
  })

  await Editor.cursorDown()
  expect(mockRpc.invocations).toEqual([['Editor.cursorDown']])
})

test('selectDown', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.selectDown'() {
      return undefined
    },
  })

  await Editor.selectDown()
  expect(mockRpc.invocations).toEqual([['Editor.selectDown']])
})

test('selectAllLeft', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.selectAllLeft'() {
      return undefined
    },
  })

  await Editor.selectAllLeft()
  expect(mockRpc.invocations).toEqual([['Editor.selectAllLeft']])
})

test('selectionGrow', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.selectionGrow'() {
      return undefined
    },
  })

  await Editor.selectionGrow()
  expect(mockRpc.invocations).toEqual([['Editor.selectionGrow']])
})

test('selectAllRight', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.selectAllRight'() {
      return undefined
    },
  })

  await Editor.selectAllRight()
  expect(mockRpc.invocations).toEqual([['Editor.selectAllRight']])
})

test('selectAllOccurrences', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.selectAllOccurrences'() {
      return undefined
    },
  })

  await Editor.selectAllOccurrences()
  expect(mockRpc.invocations).toEqual([['Editor.selectAllOccurrences']])
})

test('selectUp', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.selectUp'() {
      return undefined
    },
  })

  await Editor.selectUp()
  expect(mockRpc.invocations).toEqual([['Editor.selectUp']])
})

test('cursorUp', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorUp'() {
      return undefined
    },
  })

  await Editor.cursorUp()
  expect(mockRpc.invocations).toEqual([['Editor.cursorUp']])
})

test('cursorWordLeft', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorWordLeft'() {
      return undefined
    },
  })

  await Editor.cursorWordLeft()
  expect(mockRpc.invocations).toEqual([['Editor.cursorWordLeft']])
})

test('setText', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.setText'() {
      return undefined
    },
  })

  await Editor.setText('text')
  expect(mockRpc.invocations).toEqual([['Editor.setText', 'text']])
})

test('deleteAll', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.deleteAll'() {
      return undefined
    },
  })

  await Editor.deleteAll()
  expect(mockRpc.invocations).toEqual([['Editor.deleteAll']])
})

test('cursorWordRight', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorWordRight'() {
      return undefined
    },
  })

  await Editor.cursorWordRight()
  expect(mockRpc.invocations).toEqual([['Editor.cursorWordRight']])
})

test('goToDefinition', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.goToDefinition'() {
      return undefined
    },
  })

  await Editor.goToDefinition()
  expect(mockRpc.invocations).toEqual([['Editor.goToDefinition']])
})

test('openHover', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.showHover2'() {
      return undefined
    },
  })

  await Editor.openHover()
  expect(mockRpc.invocations).toEqual([['Editor.showHover2']])
})

test('goToTypeDefinition', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.goToTypeDefinition'() {
      return undefined
    },
  })

  await Editor.goToTypeDefinition()
  expect(mockRpc.invocations).toEqual([['Editor.goToTypeDefinition']])
})

test('type', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.type'() {
      return undefined
    },
  })

  await Editor.type('text')
  expect(mockRpc.invocations).toEqual([['Editor.type', 'text']])
})

test('findAllReferences', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SideBar.show'() {
      return undefined
    },
  })

  await Editor.findAllReferences()
  expect(mockRpc.invocations).toEqual([['SideBar.show', 'References', true]])
})

test('findAllImplementations', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SideBar.show'() {
      return undefined
    },
  })

  await Editor.findAllImplementations()
  expect(mockRpc.invocations).toEqual([['SideBar.show', 'Implementations', true]])
})

test('setSelections', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.setSelections'() {
      return undefined
    },
  })

  await Editor.setSelections([])
  expect(mockRpc.invocations).toEqual([['Editor.setSelections', []]])
})

test('openFindWidget', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.openFind'() {
      return undefined
    },
  })

  await Editor.openFindWidget()
  expect(mockRpc.invocations).toEqual([['Editor.openFind']])
})

test('setDeltaY', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.setDeltaY'() {
      return undefined
    },
  })

  await Editor.setDeltaY(10)
  expect(mockRpc.invocations).toEqual([['Editor.setDeltaY', 10]])
})

test('format', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.format'() {
      return undefined
    },
  })

  await Editor.format()
  expect(mockRpc.invocations).toEqual([['Editor.format']])
})

test('unIndent', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.unIndent'() {
      return undefined
    },
  })

  await Editor.unIndent()
  expect(mockRpc.invocations).toEqual([['Editor.unIndent']])
})

test('insertLineBreak', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.insertLineBreak'() {
      return undefined
    },
  })

  await Editor.insertLineBreak()
  expect(mockRpc.invocations).toEqual([['Editor.insertLineBreak']])
})

test('openSourceActions', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.showSourceActions2'() {
      return undefined
    },
  })

  await Editor.openSourceActions()
  expect(mockRpc.invocations).toEqual([['Editor.showSourceActions2']])
})

test('sourceActionsSelectCurrent', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'EditorSourceActions.selectCurrent'() {
      return undefined
    },
  })

  await Editor.sourceActionsSelectCurrent()
  expect(mockRpc.invocations).toEqual([['EditorSourceActions.selectCurrent']])
})

test('openCompletionDetails', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'EditorCompletion.openDetails'() {
      return undefined
    },
  })

  await Editor.openCompletionDetails()
  expect(mockRpc.invocations).toEqual([['EditorCompletion.openDetails']])
})

test('closeCompletionDetails', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'EditorCompletion.closeDetails'() {
      return undefined
    },
  })

  await Editor.closeCompletionDetails()
  expect(mockRpc.invocations).toEqual([['EditorCompletion.closeDetails']])
})

test('toggleCompletionDetails', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'EditorCompletion.toggleDetails'() {
      return undefined
    },
  })

  await Editor.toggleCompletionDetails()
  expect(mockRpc.invocations).toEqual([['EditorCompletion.toggleDetails']])
})

test('organizeImports', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.organizeImports'() {
      return undefined
    },
  })

  await Editor.organizeImports()
  expect(mockRpc.invocations).toEqual([['Editor.organizeImports']])
})

test('addAllMissingImports', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.addAllMissingImports'() {
      return undefined
    },
  })

  await Editor.addAllMissingImports()
  expect(mockRpc.invocations).toEqual([['Editor.addAllMissingImports']])
})

test('sortImports', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.sortImports'() {
      return undefined
    },
  })

  await Editor.sortImports()
  expect(mockRpc.invocations).toEqual([['Editor.sortImports']])
})

test('toggleLineComment', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.toggleLineComment'() {
      return undefined
    },
  })

  await Editor.toggleLineComment()
  expect(mockRpc.invocations).toEqual([['Editor.toggleLineComment']])
})

test('toggleBlockComment', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.toggleBlockComment'() {
      return undefined
    },
  })

  await Editor.toggleBlockComment()
  expect(mockRpc.invocations).toEqual([['Editor.toggleBlockComment']])
})

test('selectAll', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.toggleBlockComment'() {
      return undefined
    },
  })

  await Editor.selectAll()
  expect(mockRpc.invocations).toEqual([['Editor.toggleBlockComment']])
})

test('openColorPicker', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.openColorPicker'() {
      return undefined
    },
  })

  await Editor.openColorPicker()
  expect(mockRpc.invocations).toEqual([['Editor.openColorPicker']])
})

test('openFind', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.openFind2'() {
      return undefined
    },
  })

  await Editor.openFind()
  expect(mockRpc.invocations).toEqual([['Editor.openFind2']])
})

test('deleteAllLeft', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.deleteAllLeft'() {
      return undefined
    },
  })

  await Editor.deleteAllLeft()
  expect(mockRpc.invocations).toEqual([['Editor.deleteAllLeft']])
})

test('deleteAllRight', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.deleteAllRight'() {
      return undefined
    },
  })

  await Editor.deleteAllRight()
  expect(mockRpc.invocations).toEqual([['Editor.deleteAllRight']])
})

test('cursorWordPartLeft', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorWordPartLeft'() {
      return undefined
    },
  })

  await Editor.cursorWordPartLeft()
  expect(mockRpc.invocations).toEqual([['Editor.cursorWordPartLeft']])
})

test('cursorWordPartRight', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorWordPartRight'() {
      return undefined
    },
  })

  await Editor.cursorWordPartRight()
  expect(mockRpc.invocations).toEqual([['Editor.cursorWordPartRight']])
})

test('cursorEnd', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorEnd'() {
      return undefined
    },
  })

  await Editor.cursorEnd()
  expect(mockRpc.invocations).toEqual([['Editor.cursorEnd']])
})

test('cursorHome', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorHome'() {
      return undefined
    },
  })

  await Editor.cursorHome()
  expect(mockRpc.invocations).toEqual([['Editor.cursorHome']])
})

test('copyLineUp', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.copyLineUp'() {
      return undefined
    },
  })

  await Editor.copyLineUp()
  expect(mockRpc.invocations).toEqual([['Editor.copyLineUp']])
})

test('copy', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.copy'() {
      return undefined
    },
  })

  await Editor.copy()
  expect(mockRpc.invocations).toEqual([['Editor.copy']])
})

test('closeColorPicker', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.closeColorPicker'() {
      return undefined
    },
  })

  await Editor.closeColorPicker()
  expect(mockRpc.invocations).toEqual([['Editor.closeColorPicker']])
})

test('openContextMenu', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.contextMenu'() {
      return undefined
    },
  })

  await Editor.openContextMenu()
  expect(mockRpc.invocations).toEqual([['Editor.contextMenu', 0, 0, 0]])
})

test('getText', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.getText'() {
      return 'test text'
    },
  })

  const text = await Editor.getText()
  expect(mockRpc.invocations).toEqual([['Editor.getText']])
  expect(text).toBe('test text')
})

test('rename', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.rename'() {
      return undefined
    },
  })

  await Editor.rename()
  expect(mockRpc.invocations).toEqual([['Editor.rename']])
})

test('showHover', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.showHover2'() {
      return undefined
    },
  })

  await Editor.showHover()
  expect(mockRpc.invocations).toEqual([['Editor.showHover2']])
})

test('openRename', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.openRename'() {
      return undefined
    },
  })

  await Editor.openRename()
  expect(mockRpc.invocations).toEqual([['Editor.openRename']])
})

test('growSelection', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.selectionGrow'() {
      return undefined
    },
  })

  await Editor.growSelection()
  expect(mockRpc.invocations).toEqual([['Editor.selectionGrow']])
})

test('executeTabCompletion', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.tabCompletion'() {
      return undefined
    },
  })

  await Editor.executeTabCompletion()
  expect(mockRpc.invocations).toEqual([['Editor.tabCompletion']])
})

test('rename2', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.openRename'() {
      return undefined
    },
    'EditorRename.accept'() {
      return undefined
    },
    'EditorRename.handleInput'() {
      return undefined
    },
  })

  await Editor.rename2('newName')
  expect(mockRpc.invocations).toEqual([['Editor.openRename'], ['EditorRename.handleInput', 'newName', 2], ['EditorRename.accept']])
})

test('getSelections', async () => {
  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getKeys'() {
      return ['1']
    },
    'Editor.getSelections'() {
      return new Uint32Array([0, 5, 10, 15])
    },
  })

  const selections = await Editor.getSelections()
  expect(mockRpc.invocations).toEqual([['Editor.getKeys'], ['Editor.getSelections', 1]])
  expect(selections).toEqual(new Uint32Array([0, 5, 10, 15]))
})

test('shouldHaveText - success case', async () => {
  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getKeys'() {
      return ['1']
    },
    'Editor.getText'() {
      return 'expected text'
    },
  })

  await Editor.shouldHaveText('expected text')
  expect(mockRpc.invocations).toEqual([['Editor.getKeys'], ['Editor.getText', 1]])
})

test('shouldHaveText - throws error when text does not match', async () => {
  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getKeys'() {
      return ['1']
    },
    'Editor.getText'() {
      return 'wrong text'
    },
  })

  await expect(Editor.shouldHaveText('expected text')).rejects.toThrow('Expected editor to have text expected text but was wrong text')
  expect(mockRpc.invocations).toEqual([['Editor.getKeys'], ['Editor.getText', 1]])
})

test('shouldHaveSelections - success case', async () => {
  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getKeys'() {
      return ['1']
    },
    'Editor.getSelections'() {
      return new Uint32Array([0, 5, 10, 15])
    },
  })

  const expectedSelections = new Uint32Array([0, 5, 10, 15])
  await Editor.shouldHaveSelections(expectedSelections)
  expect(mockRpc.invocations).toEqual([['Editor.getKeys'], ['Editor.getSelections', 1]])
})

test('shouldHaveSelections - throws error when selections do not match', async () => {
  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getKeys'() {
      return ['1']
    },
    'Editor.getSelections'() {
      return new Uint32Array([0, 5, 10, 15])
    },
  })

  const expectedSelections = new Uint32Array([1, 6, 11, 16])
  await expect(Editor.shouldHaveSelections(expectedSelections)).rejects.toThrow('Expected editor to have selections')
  expect(mockRpc.invocations).toEqual([['Editor.getKeys'], ['Editor.getSelections', 1]])
})

test('undo', async () => {
  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.undo'() {
      return undefined
    },
  })

  await Editor.undo()
  expect(mockRpc.invocations).toEqual([['Editor.undo']])
})

test('redo', async () => {
  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.redo'() {
      return undefined
    },
  })

  await Editor.redo()
  expect(mockRpc.invocations).toEqual([['Editor.redo']])
})

test('shouldHaveDiagnostics - success case', async () => {
  const expectedDiagnostics = [
    {
      columnIndex: 0,
      endColumnIndex: 5,
      endRowIndex: 0,
      message: 'Syntax error',
      rowIndex: 0,
      type: 'error' as const,
    },
  ]

  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getDiagnostics'() {
      return expectedDiagnostics
    },
    'Editor.getKeys'() {
      return ['1']
    },
  })

  await Editor.shouldHaveDiagnostics(expectedDiagnostics)
  expect(mockRpc.invocations).toEqual([['Editor.getKeys'], ['Editor.getDiagnostics', 1]])
})

test('shouldHaveDiagnostics - throws error when diagnostics do not match', async () => {
  const actualDiagnostics = [
    {
      columnIndex: 0,
      endColumnIndex: 5,
      endRowIndex: 0,
      message: 'Syntax error',
      rowIndex: 0,
      type: 'error' as const,
    },
  ]

  const expectedDiagnostics = [
    {
      columnIndex: 1,
      endColumnIndex: 6,
      endRowIndex: 1,
      message: 'Different error',
      rowIndex: 1,
      type: 'warning' as const,
    },
  ]

  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getDiagnostics'() {
      return actualDiagnostics
    },
    'Editor.getKeys'() {
      return ['1']
    },
  })

  await expect(Editor.shouldHaveDiagnostics(expectedDiagnostics)).rejects.toThrow('Expected editor to have diagnostics')
  expect(mockRpc.invocations).toEqual([['Editor.getKeys'], ['Editor.getDiagnostics', 1]])
})

test('enableCompletionsOnType', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.update'() {
      return undefined
    },
  })

  await Editor.enableCompletionsOnType()
  expect(mockRpc.invocations).toEqual([['Preferences.update', { 'editor.completionsOnType': true }]])
})

test('disableCompletionsOnType', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.update'() {
      return undefined
    },
  })

  await Editor.disableCompletionsOnType()
  expect(mockRpc.invocations).toEqual([['Preferences.update', { 'editor.completionsOnType': false }]])
})

test('enableDiagnostics', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.update'() {
      return undefined
    },
  })

  await Editor.enableDiagnostics()
  expect(mockRpc.invocations).toEqual([['Preferences.update', { 'editor.diagnostics': true }]])
})

test('disableDiagnostics', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.update'() {
      return undefined
    },
  })

  await Editor.disableDiagnostics()
  expect(mockRpc.invocations).toEqual([['Preferences.update', { 'editor.diagnostics': false }]])
})

// Note: getSelections, shouldHaveSelections, undo, and redo functions use EditorWorker
// which requires complex RPC setup. These are tested indirectly through integration tests.
