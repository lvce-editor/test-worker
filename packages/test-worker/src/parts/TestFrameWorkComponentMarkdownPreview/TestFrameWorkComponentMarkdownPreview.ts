import { MainAreaWorker } from '@lvce-editor/rpc-registry'
import type { ILocatorExternal } from '../ILocatorExternal/ILocatorExternal.ts'
import { createLocator } from '../CreateLocator/CreateLocator.ts'
import { expect } from '../Expect/Expect.ts'

const webView = (): ILocatorExternal => {
  return createLocator('.WebViewIframe')
}

export const open = async (uri: string): Promise<void> => {
  await MainAreaWorker.invoke('Main.openInput', {
    editorInput: {
      providerId: 'builtin.markdown-preview',
      type: 'webview',
      uri,
    },
    focus: true,
    preview: false,
  })
  await expect(webView()).toBeVisible()
  await expect(webView()).toHaveAttribute('title', 'Markdown Preview')
}
