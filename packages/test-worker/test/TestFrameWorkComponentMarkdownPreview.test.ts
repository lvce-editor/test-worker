import { expect, test } from '@jest/globals'
import { MainAreaWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as MarkdownPreview from '../src/parts/TestFrameWorkComponentMarkdownPreview/TestFrameWorkComponentMarkdownPreview.ts'

test('open', async () => {
  using mainAreaRpc = MainAreaWorker.registerMockRpc({
    'Main.openInput'() {
      return undefined
    },
  })
  using rendererRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return undefined
    },
  })

  await MarkdownPreview.open('memfs:///workspace/test.md')

  expect(mainAreaRpc.invocations).toEqual([
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
  ])
  expect(rendererRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', [{ selector: '.WebViewIframe', type: 1 }], 'toBeVisible', {}],
    [
      'TestFrameWork.checkSingleElementCondition',
      [{ selector: '.WebViewIframe', type: 1 }],
      'toHaveAttribute',
      { key: 'title', value: 'Markdown Preview' },
    ],
  ])
})

test('open propagates main area failures before checking the webview', async () => {
  using mainAreaRpc = MainAreaWorker.registerMockRpc({
    'Main.openInput'() {
      throw new Error('Failed to open markdown preview')
    },
  })
  using rendererRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return undefined
    },
  })

  await expect(MarkdownPreview.open('memfs:///workspace/test.md')).rejects.toThrow('Failed to open markdown preview')
  expect(mainAreaRpc.invocations).toHaveLength(1)
  expect(rendererRpc.invocations).toEqual([])
})
