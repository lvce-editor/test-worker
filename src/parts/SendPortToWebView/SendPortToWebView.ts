import * as Rpc from '../Rpc/Rpc.ts'

export const sendPortToWebView = async (webviewId: string, port: MessagePort) => {
  // TODO use unique id instead of webview id
  // TODO ask renderer worker for a qnique id?
  await Rpc.invokeAndTransfer([port], 'Transferrable.transferToRendererProcess', webviewId, port)
  await Rpc.invoke('Transferrable.transferToWebView', webviewId)
  console.log('did send port to renderer process')
  // TODO ask renderer process to transfer the port to the webview
}
