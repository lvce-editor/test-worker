import * as GetPortTuple from '../GetPortTuple/GetPortTuple.ts'
import * as JsonRpc from '../JsonRpc/JsonRpc.ts'
import * as SendPortToWebView from '../SendPortToWebView/SendPortToWebView.ts'
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

export const createPortIpc = async (
  webViewId: string,
): Promise<{
  port: MessagePort
  send(message: any): void
}> => {
  const { port1, port2 } = GetPortTuple.getPortTuple()
  const firstEventPromise = WaitForReadyEvent.waitForFirstEventEvent(port1)
  await SendPortToWebView.sendPortToWebView(webViewId, port2)
  const firstEvent = await firstEventPromise
  if (firstEvent.data !== 'ready') {
    throw new Error('unexpected first message')
  }
  const handleOtherMessage = async (event: any) => {
    // @ts-ignore
    await JsonRpc.handleJsonRpcMessage(ipc, event.data, JsonRpc.resolve, preparePrettyError, execute, logError, requiresSocket)
  }
  port1.onmessage = handleOtherMessage
  const ipc = {
    send(message: any) {
      port1.postMessage(message)
    },
  }
  return {
    port: port1,
    send(message: any) {
      port1.postMessage(message)
    },
  }
}
