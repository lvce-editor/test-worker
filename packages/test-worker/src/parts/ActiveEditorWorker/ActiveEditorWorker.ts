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

export const invoke = async (commandId: string, ...args: readonly any[]): Promise<any> => {
  if (!RendererProcess.isInitialized() || rendererWorkerCommands.has(commandId)) {
    return RendererWorker.invoke(commandId, ...args)
  }
  let editorUid: number
  try {
    const mainAreaUid = await RendererProcess.invoke('DirectView.getUid', 'MainArea')
    editorUid = await MainAreaWorker.invoke('MainArea.getActiveEditorUid', mainAreaUid)
  } catch {
    return RendererWorker.invoke(commandId, ...args)
  }
  return EditorWorker.invoke('Editor.executeViewletCommand', editorUid, commandId, ...args)
}
