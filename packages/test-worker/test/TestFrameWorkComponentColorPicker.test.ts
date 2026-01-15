import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ColorPicker from '../src/parts/TestFrameWorkComponentColorPicker/TestFrameWorkComponentColorPicker.ts'

test('setRelativeX', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorPicker.setRelativeX'() {
      return undefined
    },
  })

  await ColorPicker.setRelativeX(100)
  expect(mockRpc.invocations).toEqual([['ColorPicker.setRelativeX', 100]])
})
