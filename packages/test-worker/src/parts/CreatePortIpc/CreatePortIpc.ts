import { MessagePortRpcParent } from '@lvce-editor/rpc'
import * as GetPortTuple from '../GetPortTuple/GetPortTuple.ts'
import * as GetWebViewInfo from '../GetWebViewInfo/GetWebViewInfo.ts'
import * as SetWebViewPort from '../SetWebViewPort/SetWebViewPort.ts'
import * as WaitForReadyEvent from '../WaitForReadyEvent/WaitForReadyEvent.ts'

export const createPortIpc = async (webViewId: string): Promise<any> => {
  // TODO use transforpemssageportrpc
  const { port1, port2 } = GetPortTuple.getPortTuple()
  const firstEventPromise = WaitForReadyEvent.waitForFirstEventEvent(port1)
  // TODO ask extension host worker about webview uid
  const info = await GetWebViewInfo.getWebViewInfo(webViewId)
  const portType = 'test'
  await SetWebViewPort.setWebViewPort(info.uid, port2, info.origin, portType)

  // await SendPortToWebView.sendPortToWebView(webViewId, port2)
  const firstEvent = await firstEventPromise
  if (firstEvent.data !== 'ready') {
    throw new Error('unexpected first message')
  }
  const rpc = await MessagePortRpcParent.create({
    messagePort: port1,
    commandMap: {},
    isMessagePortOpen: true,
  })
  return rpc
}
