import * as GetWebViewInfo from '../GetWebViewInfo/GetWebViewInfo.ts'
import * as SetWebViewPort from '../SetWebViewPort/SetWebViewPort.ts'

export const transferWebViewPort = async (webViewId: string, port: MessagePort): Promise<void> => {
  const info = await GetWebViewInfo.getWebViewInfo(webViewId)
  const portType = 'test'
  await SetWebViewPort.setWebViewPort(info.uid, port, info.origin, portType)
}
