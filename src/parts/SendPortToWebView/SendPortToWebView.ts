import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const sendPortToWebView = async (webviewId: string, port: MessagePort) => {
  // TODO maybe route it through iframe worker which can have a direct connection to the webview
  await Rpc.invokeAndTransfer('Transferrable.transferToRendererProcess', webviewId, port)
  console.log('did send port to renderer process')
  // TODO ask renderer process to transfer the port to the webview
}
