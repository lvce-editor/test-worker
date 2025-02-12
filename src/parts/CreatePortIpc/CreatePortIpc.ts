import * as GetPortTuple from '../GetPortTuple/GetPortTuple.ts'
import * as JsonRpc from '../JsonRpc/JsonRpc.ts'
import * as ParentRpc from '../ParentRpc/ParentRpc.ts'
import * as WaitForReadyEvent from '../WaitForReadyEvent/WaitForReadyEvent.ts'

const preparePrettyError = (error: any): any => {
  return error
}

const logError = (): void => {
  // ignore
}

const execute = (): void => {}

const requiresSocket = (): boolean => {
  return false
}

export const createPortIpc = async (webViewId: string): Promise<any> => {
  const { port1, port2 } = GetPortTuple.getPortTuple()
  const firstEventPromise = WaitForReadyEvent.waitForFirstEventEvent(port1)
  // TODO ask extension host worker about webview uid

  const info = await ParentRpc.invoke('WebView.getWebViewInfo', webViewId)

  const portType = 'test'
  await ParentRpc.invokeAndTransfer('WebView.setPort', info.uid, port2, info.origin, portType)

  // await SendPortToWebView.sendPortToWebView(webViewId, port2)
  const firstEvent = await firstEventPromise
  if (firstEvent.data !== 'ready') {
    throw new Error('unexpected first message')
  }
  const handleOtherMessage = async (event: any): Promise<void> => {
    // @ts-ignore
    await JsonRpc.handleJsonRpcMessage(ipc, event.data, JsonRpc.resolve, preparePrettyError, execute, logError, requiresSocket)
  }
  port1.onmessage = handleOtherMessage
  const ipc = {
    send(message: any): void {
      port1.postMessage(message)
    },
  }
  return ipc
}
