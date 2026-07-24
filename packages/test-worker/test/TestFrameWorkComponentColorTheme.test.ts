import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ColorTheme from '../src/parts/TestFrameWorkComponentColorTheme/TestFrameWorkComponentColorTheme.ts'

test('setColorTheme', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.setColorTheme'() {
      return undefined
    },
  })

  await ColorTheme.setColorTheme('slime-theme')

  expect(mockRpc.invocations).toEqual([['ColorTheme.setColorTheme', 'slime-theme']])
})
