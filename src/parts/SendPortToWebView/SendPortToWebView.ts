import * as Rpc from '../Rpc/Rpc.ts'

export const sendPortToWebView = (webviewId: string, port: MessagePort) => {
  return Rpc.invokeAndTransfer([port], 'SendPortToWebView.sendPortToWebView', webviewId, port)
}
