import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Editor from '../src/parts/TestFrameWorkComponentEditor/TestFrameWorkComponentEditor.ts'

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
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.getText'() {
      return 'wrong text'
    },
  })

  await expect(Editor.shouldHaveText('test text')).rejects.toThrow('Expected editor to have text test text but was wrong text')
})

test('executeTabCompletion', async () => {
  await Editor.executeTabCompletion()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Editor.tabCompletion')
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
  expect(mockRpc.invocations).toEqual([
    ['Editor.openRename'],
    ['EditorRename.handleInput', 'newName', 2],
    ['EditorRename.accept']
  ])
})

// Note: getSelections, shouldHaveSelections, undo, and redo functions use EditorWorker
// which requires complex RPC setup. These are tested indirectly through integration tests.
