import { expect, jest, test, beforeEach } from '@jest/globals'
import { RendererWorker, EditorWorker } from '@lvce-editor/rpc-registry'
import { reset } from '../src/parts/EditorWorker/EditorWorker.ts'
import * as Editor from '../src/parts/TestFrameWorkComponentEditor/TestFrameWorkComponentEditor.ts'

beforeEach(() => {
  reset()
})

test('setCursor', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet'() {
      return undefined
    },
  })

  await Editor.setCursor(1, 2)
  expect(mockRpc.invocations).toEqual([['Editor.cursorSet', 1, 2]])
})

test('openCompletion', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.openCompletion'() {
      return undefined
    },
  })

  await Editor.openCompletion()
  expect(mockRpc.invocations).toEqual([['Editor.openCompletion']])
})

test('closeCompletion', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'EditorCompletion.close'() {
      return undefined
    },
  })

  await Editor.closeCompletion()
  expect(mockRpc.invocations).toEqual([['EditorCompletion.close']])
})

test('openEditorContextMenu', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.handleContextMenu'() {
      return undefined
    },
  })

  await Editor.openEditorContextMenu()
  expect(mockRpc.invocations).toEqual([['Editor.handleContextMenu', 0, 0]])
})

test('invokeTabCompletion', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.tabCompletion'() {
      return undefined
    },
  })

  await Editor.invokeTabCompletion()
  expect(mockRpc.invocations).toEqual([['Editor.tabCompletion']])
})

test('invokeBraceCompletion', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.braceCompletion'() {
      return undefined
    },
  })

  await Editor.invokeBraceCompletion('text')
  expect(mockRpc.invocations).toEqual([['Editor.braceCompletion', 'text']])
})

test('cursorCharacterRight', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorCharacterRight'() {
      return undefined
    },
  })

  await Editor.cursorCharacterRight()
  expect(mockRpc.invocations).toEqual([['Editor.cursorCharacterRight']])
})

test('cursorCharacterLeft', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorCharacterLeft'() {
      return undefined
    },
  })

  await Editor.cursorCharacterLeft()
  expect(mockRpc.invocations).toEqual([['Editor.cursorCharacterLeft']])
})

test('copyLineDown', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.copyLineDown'() {
      return undefined
    },
  })

  await Editor.copyLineDown()
  expect(mockRpc.invocations).toEqual([['Editor.copyLineDown']])
})

test('cursorDown', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorDown'() {
      return undefined
    },
  })

  await Editor.cursorDown()
  expect(mockRpc.invocations).toEqual([['Editor.cursorDown']])
})

test('cursorUp', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorUp'() {
      return undefined
    },
  })

  await Editor.cursorUp()
  expect(mockRpc.invocations).toEqual([['Editor.cursorUp']])
})

test('cursorWordLeft', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorWordLeft'() {
      return undefined
    },
  })

  await Editor.cursorWordLeft()
  expect(mockRpc.invocations).toEqual([['Editor.cursorWordLeft']])
})

test('cursorWordRight', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorWordRight'() {
      return undefined
    },
  })

  await Editor.cursorWordRight()
  expect(mockRpc.invocations).toEqual([['Editor.cursorWordRight']])
})

test('goToDefinition', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.goToDefinition'() {
      return undefined
    },
  })

  await Editor.goToDefinition()
  expect(mockRpc.invocations).toEqual([['Editor.goToDefinition']])
})

test('openHover', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.showHover2'() {
      return undefined
    },
  })

  await Editor.openHover()
  expect(mockRpc.invocations).toEqual([['Editor.showHover2']])
})

test('goToTypeDefinition', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.goToTypeDefinition'() {
      return undefined
    },
  })

  await Editor.goToTypeDefinition()
  expect(mockRpc.invocations).toEqual([['Editor.goToTypeDefinition']])
})

test('type', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.type'() {
      return undefined
    },
  })

  await Editor.type('text')
  expect(mockRpc.invocations).toEqual([['Editor.type', 'text']])
})

test('findAllReferences', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SideBar.show'() {
      return undefined
    },
  })

  await Editor.findAllReferences()
  expect(mockRpc.invocations).toEqual([['SideBar.show', 'References', true]])
})

test('findAllImplementations', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SideBar.show'() {
      return undefined
    },
  })

  await Editor.findAllImplementations()
  expect(mockRpc.invocations).toEqual([['SideBar.show', 'Implementations', true]])
})

test('setSelections', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.setSelections'() {
      return undefined
    },
  })

  await Editor.setSelections([])
  expect(mockRpc.invocations).toEqual([['Editor.setSelections', []]])
})

test('openFindWidget', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.openFind'() {
      return undefined
    },
  })

  await Editor.openFindWidget()
  expect(mockRpc.invocations).toEqual([['Editor.openFind']])
})

test('setDeltaY', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.setDeltaY'() {
      return undefined
    },
  })

  await Editor.setDeltaY(10)
  expect(mockRpc.invocations).toEqual([['Editor.setDeltaY', 10]])
})

test('format', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.format'() {
      return undefined
    },
  })

  await Editor.format()
  expect(mockRpc.invocations).toEqual([['Editor.format']])
})

test('insertLineBreak', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.insertLineBreak'() {
      return undefined
    },
  })

  await Editor.insertLineBreak()
  expect(mockRpc.invocations).toEqual([['Editor.insertLineBreak']])
})

test('openSourceActions', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.showSourceActions2'() {
      return undefined
    },
  })

  await Editor.openSourceActions()
  expect(mockRpc.invocations).toEqual([['Editor.showSourceActions2']])
})

test('sourceActionsSelectCurrent', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'EditorSourceActions.selectCurrent'() {
      return undefined
    },
  })

  await Editor.sourceActionsSelectCurrent()
  expect(mockRpc.invocations).toEqual([['EditorSourceActions.selectCurrent']])
})

test('openCompletionDetails', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'EditorCompletion.openDetails'() {
      return undefined
    },
  })

  await Editor.openCompletionDetails()
  expect(mockRpc.invocations).toEqual([['EditorCompletion.openDetails']])
})

test('closeCompletionDetails', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'EditorCompletion.closeDetails'() {
      return undefined
    },
  })

  await Editor.closeCompletionDetails()
  expect(mockRpc.invocations).toEqual([['EditorCompletion.closeDetails']])
})

test('toggleCompletionDetails', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'EditorCompletion.toggleDetails'() {
      return undefined
    },
  })

  await Editor.toggleCompletionDetails()
  expect(mockRpc.invocations).toEqual([['EditorCompletion.toggleDetails']])
})

test('organizeImports', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.organizeImports'() {
      return undefined
    },
  })

  await Editor.organizeImports()
  expect(mockRpc.invocations).toEqual([['Editor.organizeImports']])
})

test('addAllMissingImports', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.addAllMissingImports'() {
      return undefined
    },
  })

  await Editor.addAllMissingImports()
  expect(mockRpc.invocations).toEqual([['Editor.addAllMissingImports']])
})

test('sortImports', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.sortImports'() {
      return undefined
    },
  })

  await Editor.sortImports()
  expect(mockRpc.invocations).toEqual([['Editor.sortImports']])
})

test('toggleLineComment', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.toggleLineComment'() {
      return undefined
    },
  })

  await Editor.toggleLineComment()
  expect(mockRpc.invocations).toEqual([['Editor.toggleLineComment']])
})

test('toggleBlockComment', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.toggleBlockComment'() {
      return undefined
    },
  })

  await Editor.toggleBlockComment()
  expect(mockRpc.invocations).toEqual([['Editor.toggleBlockComment']])
})

test('selectAll', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.toggleBlockComment'() {
      return undefined
    },
  })

  await Editor.selectAll()
  expect(mockRpc.invocations).toEqual([['Editor.toggleBlockComment']])
})

test('openColorPicker', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.openColorPicker'() {
      return undefined
    },
  })

  await Editor.openColorPicker()
  expect(mockRpc.invocations).toEqual([['Editor.openColorPicker']])
})

test('openFind', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.openFind2'() {
      return undefined
    },
  })

  await Editor.openFind()
  expect(mockRpc.invocations).toEqual([['Editor.openFind2']])
})

test('deleteAllLeft', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.deleteAllLeft'() {
      return undefined
    },
  })

  await Editor.deleteAllLeft()
  expect(mockRpc.invocations).toEqual([['Editor.deleteAllLeft']])
})

test('deleteAllRight', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.deleteAllRight'() {
      return undefined
    },
  })

  await Editor.deleteAllRight()
  expect(mockRpc.invocations).toEqual([['Editor.deleteAllRight']])
})

test('cursorWordPartLeft', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorWordPartLeft'() {
      return undefined
    },
  })

  await Editor.cursorWordPartLeft()
  expect(mockRpc.invocations).toEqual([['Editor.cursorWordPartLeft']])
})

test('cursorWordPartRight', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorWordPartRight'() {
      return undefined
    },
  })

  await Editor.cursorWordPartRight()
  expect(mockRpc.invocations).toEqual([['Editor.cursorWordPartRight']])
})

test('cursorEnd', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorEnd'() {
      return undefined
    },
  })

  await Editor.cursorEnd()
  expect(mockRpc.invocations).toEqual([['Editor.cursorEnd']])
})

test('cursorHome', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorHome'() {
      return undefined
    },
  })

  await Editor.cursorHome()
  expect(mockRpc.invocations).toEqual([['Editor.cursorHome']])
})

test('copyLineUp', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.copyLineUp'() {
      return undefined
    },
  })

  await Editor.copyLineUp()
  expect(mockRpc.invocations).toEqual([['Editor.copyLineUp']])
})

test('copy', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.copy'() {
      return undefined
    },
  })

  await Editor.copy()
  expect(mockRpc.invocations).toEqual([['Editor.copy']])
})

test('closeColorPicker', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.closeColorPicker'() {
      return undefined
    },
  })

  await Editor.closeColorPicker()
  expect(mockRpc.invocations).toEqual([['Editor.closeColorPicker']])
})

test('openContextMenu', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.contextMenu'() {
      return undefined
    },
  })

  await Editor.openContextMenu()
  expect(mockRpc.invocations).toEqual([['Editor.contextMenu', 0, 0, 0]])
})

test('getText', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.getText'() {
      return 'test text'
    },
  })

  const text = await Editor.getText()
  expect(mockRpc.invocations).toEqual([['Editor.getText']])
  expect(text).toBe('test text')
})

test('rename', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.rename'() {
      return undefined
    },
  })

  await Editor.rename()
  expect(mockRpc.invocations).toEqual([['Editor.rename']])
})

test('showHover', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.showHover2'() {
      return undefined
    },
  })

  await Editor.showHover()
  expect(mockRpc.invocations).toEqual([['Editor.showHover2']])
})

test('openRename', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.openRename'() {
      return undefined
    },
  })

  await Editor.openRename()
  expect(mockRpc.invocations).toEqual([['Editor.openRename']])
})

test.skip('shouldHaveText', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.getText'() {
      return 'test text'
    },
  })

  await Editor.shouldHaveText('test text')
  expect(mockRpc.invocations).toEqual([['Editor.getText']])
})

test.skip('shouldHaveText - throws error when text does not match', async () => {
  RendererWorker.registerMockRpc({
    'Editor.getText'() {
      return 'wrong text'
    },
  })

  await expect(Editor.shouldHaveText('test text')).rejects.toThrow('Expected editor to have text test text but was wrong text')
})

test('growSelection', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.selectionGrow'() {
      return undefined
    },
  })

  await Editor.growSelection()
  expect(mockRpc.invocations).toEqual([['Editor.selectionGrow']])
})

test('getSelections', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker'() {
      return undefined
    },
  })

  const editorMockRpc = EditorWorker.registerMockRpc({
    'Editor.getKeys'() {
      return ['1']
    },
    'Editor.getSelections'() {
      return new Uint32Array([1, 2, 3])
    },
  })

  const selections = await Editor.getSelections()
  expect(editorMockRpc.invocations).toEqual([['Editor.getKeys'], ['Editor.getSelections', 1]])
  expect(selections).toEqual(new Uint32Array([1, 2, 3]))
})

test('shouldHaveText', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker'() {
      return undefined
    },
  })

  const editorMockRpc = EditorWorker.registerMockRpc({
    'Editor.getKeys'() {
      return ['1']
    },
    'Editor.getText'() {
      return 'test text'
    },
  })

  await Editor.shouldHaveText('test text')
  expect(editorMockRpc.invocations).toEqual([['Editor.getKeys'], ['Editor.getText', 1]])
})

test('shouldHaveText - throws error when text does not match', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker'() {
      return undefined
    },
  })

  const editorMockRpc = EditorWorker.registerMockRpc({
    'Editor.getKeys'() {
      return ['1']
    },
    'Editor.getText'() {
      return 'wrong text'
    },
  })

  await expect(Editor.shouldHaveText('test text')).rejects.toThrow('Expected editor to have text test text but was wrong text')
  expect(editorMockRpc.invocations).toEqual([['Editor.getKeys'], ['Editor.getText', 1]])
})

test('shouldHaveSelections', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker'() {
      return undefined
    },
  })

  const editorMockRpc = EditorWorker.registerMockRpc({
    'Editor.getKeys'() {
      return ['1']
    },
    'Editor.getSelections'() {
      return new Uint32Array([1, 2, 3])
    },
  })

  await Editor.shouldHaveSelections(new Uint32Array([1, 2, 3]))
  expect(editorMockRpc.invocations).toEqual([['Editor.getKeys'], ['Editor.getSelections', 1]])
})

test('shouldHaveSelections - throws error when selections do not match', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker'() {
      return undefined
    },
  })

  const editorMockRpc = EditorWorker.registerMockRpc({
    'Editor.getKeys'() {
      return ['1']
    },
    'Editor.getSelections'() {
      return new Uint32Array([4, 5, 6])
    },
  })

  await expect(Editor.shouldHaveSelections(new Uint32Array([1, 2, 3]))).rejects.toThrow('Expected editor to have selections 1,2,3 but was 4,5,6')
  expect(editorMockRpc.invocations).toEqual([['Editor.getKeys'], ['Editor.getSelections', 1]])
})

test('shouldHaveText - throws error when no editor found', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker'() {
      return undefined
    },
  })

  const editorMockRpc = EditorWorker.registerMockRpc({
    'Editor.getKeys'() {
      return []
    },
  })

  await expect(Editor.shouldHaveText('test text')).rejects.toThrow('no editor found')
  expect(editorMockRpc.invocations).toEqual([['Editor.getKeys']])
})

test('shouldHaveSelections - throws error when no editor found', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker'() {
      return undefined
    },
  })

  const editorMockRpc = EditorWorker.registerMockRpc({
    'Editor.getKeys'() {
      return []
    },
  })

  await expect(Editor.shouldHaveSelections(new Uint32Array([1, 2, 3]))).rejects.toThrow('no editor found')
  expect(editorMockRpc.invocations).toEqual([['Editor.getKeys']])
})

test('undo', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker'() {
      return undefined
    },
  })

  const editorMockRpc = EditorWorker.registerMockRpc({
    'Editor.undo'() {
      return undefined
    },
  })

  await Editor.undo()
  expect(editorMockRpc.invocations).toEqual([['Editor.undo']])
})

test('redo', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker'() {
      return undefined
    },
  })

  const editorMockRpc = EditorWorker.registerMockRpc({
    'Editor.redo'() {
      return undefined
    },
  })

  await Editor.redo()
  expect(editorMockRpc.invocations).toEqual([['Editor.redo']])
})

test('executeTabCompletion', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.tabCompletion'() {
      return undefined
    },
  })

  await Editor.executeTabCompletion()
  expect(mockRpc.invocations).toEqual([['Editor.tabCompletion']])
})

test('rename2', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.openRename'() {
      return undefined
    },
    'EditorRename.handleInput'() {
      return undefined
    },
    'EditorRename.accept'() {
      return undefined
    },
  })

  await Editor.rename2('newName')
  expect(mockRpc.invocations).toEqual([['Editor.openRename'], ['EditorRename.handleInput', 'newName', 2], ['EditorRename.accept']])
})

// Note: getSelections, shouldHaveSelections, undo, and redo functions use EditorWorker
// which requires complex RPC setup. These are tested indirectly through integration tests.
