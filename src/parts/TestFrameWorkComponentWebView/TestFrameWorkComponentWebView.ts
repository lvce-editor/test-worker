import * as Expect from '../Expect/Expect.ts'
import * as Locator from '../Locator/Locator.ts'

export const fromId = async (webViewId: string) => {
  // TODO
  // 1. create messagechannel
  // 2. send one message port to webview
  // 3. setup rpc connection and wait for webview to be ready
  // 4. send test commands like locator.toBeVisible to webview
  const webViewRpc = {
    invoke(method: string, ...params: any[]) {
      console.log('invoke called', method, params)
    },
  }
  return {
    locator(selector: string, options: any) {
      const baseLocator = Locator.create(selector, options)
      baseLocator.webView = webViewRpc
      return baseLocator
    },
    expect: Expect.expect,
  }
}
