import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as MarkdownPreview from '../src/parts/TestFrameWorkComponentMarkdownPreview/TestFrameWorkComponentMarkdownPreview.ts'

test('open', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openInput'() {
      return undefined
    },
    'TestFrameWork.checkSingleElementCondition'() {
      return undefined
    },
  })

  await MarkdownPreview.open('memfs:///workspace/test.md')

  expect(mockRpc.invocations).toEqual([
    [
      'Main.openInput',
      {
        editorInput: {
          providerId: 'builtin.markdown-preview',
          type: 'webview',
          uri: 'memfs:///workspace/test.md',
        },
        focus: true,
        preview: false,
      },
    ],
    ['TestFrameWork.checkSingleElementCondition', [{ selector: '.WebViewIframe', type: 1 }], 'toBeVisible', {}],
    [
      'TestFrameWork.checkSingleElementCondition',
      [{ selector: '.WebViewIframe', type: 1 }],
      'toHaveAttribute',
      { key: 'title', value: 'Markdown Preview' },
    ],
  ])
})
