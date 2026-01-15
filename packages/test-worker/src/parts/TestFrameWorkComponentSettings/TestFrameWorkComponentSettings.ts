import { RendererWorker as Rpc } from '@lvce-editor/rpc-registry'

export const update = (settings: any): Promise<void> => {
  return Rpc.invoke('Preferences.update', settings)
}

export const enableDiagnostics = (): Promise<void> => {
  return Rpc.invoke('Preferences.update', { 'editor.diagnostics': true })
}

export const disableDiagnostics = (): Promise<void> => {
  return Rpc.invoke('Preferences.update', { 'editor.diagnostics': false })
}
