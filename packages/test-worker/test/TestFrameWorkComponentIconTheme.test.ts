import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as IconTheme from '../src/parts/TestFrameWorkComponentIconTheme/TestFrameWorkComponentIconTheme.ts'

test('setIconTheme', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.setIconTheme'() {
      return undefined
    },
  })

  await IconTheme.setIconTheme('vs-code-icon-theme')

  expect(mockRpc.invocations).toEqual([['IconTheme.setIconTheme', 'vs-code-icon-theme']])
})
