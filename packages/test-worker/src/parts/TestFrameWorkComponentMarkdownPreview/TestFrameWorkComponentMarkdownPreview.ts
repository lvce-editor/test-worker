import { createLocator } from '../CreateLocator/CreateLocator.ts'
import { expect } from '../Expect/Expect.ts'
import * as Command from '../TestFrameWorkComponentCommand/TestFrameWorkComponentCommand.ts'

const webView = () => {
  return createLocator('.WebViewIframe')
}

export const open = async (uri: string): Promise<void> => {
  await Command.execute('Main.openInput', {
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
