import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const sendPortToWebView = async (webviewId: string, port: MessagePort): Promise<void> => {
  await Rpc.invokeAndTransfer('Transferrable.transferToRendererProcess', webviewId, port)
  console.log('did send port to renderer process')
}
