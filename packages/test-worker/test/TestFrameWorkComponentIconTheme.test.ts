import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as IconTheme from '../src/parts/TestFrameWorkComponentIconTheme/TestFrameWorkComponentIconTheme.ts'

test('setIconTheme', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.setIconTheme'() {
      return undefined
    },
  })

  await IconTheme.setIconTheme('vs-code-icon-theme')

  expect(mockRpc.invocations).toEqual([['IconTheme.setIconTheme', 'vs-code-icon-theme']])
})

test('getFileIcon', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon'(file: { name: string }) {
      expect(file).toEqual({ name: 'test.xml' })
      return 'file-icon.svg'
    },
  })

  const result = await IconTheme.getFileIcon({ name: 'test.xml' })

  expect(result).toBe('file-icon.svg')
  expect(mockRpc.invocations).toEqual([['IconTheme.getFileIcon', { name: 'test.xml' }]])
})

test('getFileIcon propagates rpc errors', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon'() {
      throw new Error('icon lookup failed')
    },
  })

  await expect(IconTheme.getFileIcon({ name: 'test.xml' })).rejects.toThrow('icon lookup failed')

  expect(mockRpc.invocations).toEqual([['IconTheme.getFileIcon', { name: 'test.xml' }]])
})
