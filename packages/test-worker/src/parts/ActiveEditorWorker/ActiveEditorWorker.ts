import { EditorWorker, MainAreaWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

const rendererWorkerCommands = new Set([
  'ColorPicker.setRelativeX',
  'Editor.addAllMissingImports',
  'Editor.indentLess',
  'Editor.rename',
  'Editor.sortImports',
  'EditorCompletion.handlePointerdown',
  'EditorCompletion.selectCurrentIndex',
  'EditorHover.close',
  'EditorRename.cancel',
  'EditorSourceAction.selectCurrentIndex',
  'EditorSourceActions.selectCurrent',
  'FindWidget.focusElement',
])

export const invokeMainArea = async (commandId: string, ...args: readonly any[]): Promise<any> => {
  if (!RendererProcess.isInitialized() || rendererWorkerCommands.has(commandId)) {
    return RendererWorker.invoke(commandId, ...args)
  }
  try {
    const mainAreaUid = await RendererProcess.invoke('DirectView.getUid', 'MainArea')
    const editorUid = await MainAreaWorker.invoke('MainArea.getActiveEditorUid', mainAreaUid)
    if (commandId === 'Editor.getText') {
      // The rendering command dispatcher intentionally discards return values.
      return EditorWorker.invoke(commandId, editorUid, ...args)
    }
    return EditorWorker.invoke('Editor.executeViewletCommand', editorUid, commandId, ...args)
  } catch {
    return RendererWorker.invoke(commandId, ...args)
  }
}

export const invoke = async (commandId: string, ...args: readonly any[]): Promise<any> => {
  if (!RendererProcess.isInitialized() || rendererWorkerCommands.has(commandId)) {
    return RendererWorker.invoke(commandId, ...args)
  }
  let editorUid: number
  try {
    editorUid = await RendererProcess.invoke('DirectView.getFocusedUid', 'Editor')
  } catch {
    return invokeMainArea(commandId, ...args)
  }
  return EditorWorker.invoke('Editor.executeViewletCommand', editorUid, commandId, ...args)
}
