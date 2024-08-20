import * as Rpc from '../Rpc/Rpc.ts'

export const sendPortToWebView = (webviewId: string, port: MessagePort) => {
  return Rpc.invoke('SendPortToWebView.sendPortToWebView', webviewId, port)
}
