import { RendererWorker as Rpc } from '@lvce-editor/rpc-registry'

export const update = (settings: any): Promise<void> => {
  // @ts-ignore
  return Rpc.invoke('Preferences.update', settings)
}

export const enableDiagnostics = (): Promise<void> => {
  // @ts-ignore
  return Rpc.invoke('Preferences.update', { 'editor.diagnostics': true })
}

export const disableDiagnostics = (): Promise<void> => {
  // @ts-ignore
  return Rpc.invoke('Preferences.update', { 'editor.diagnostics': false })
}
