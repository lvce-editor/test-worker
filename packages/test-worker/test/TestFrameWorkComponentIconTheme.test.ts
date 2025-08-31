import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as IconTheme from '../src/parts/TestFrameWorkComponentIconTheme/TestFrameWorkComponentIconTheme.ts'

test('setIconTheme', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await IconTheme.setIconTheme('vs-code-icon-theme')

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('IconTheme.setIconTheme', 'vs-code-icon-theme')
})


