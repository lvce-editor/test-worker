import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as References from '../src/parts/TestFrameWorkComponentReferences/TestFrameWorkComponentReferences.ts'

test('clear', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'References.clear'() {
      return undefined
    },
  })

  await References.clear()

  expect(mockRpc.invocations).toEqual([['References.clear']])
})

test('collapseAll', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'References.collapseAll'() {
      return undefined
    },
  })

  await References.collapseAll()

  expect(mockRpc.invocations).toEqual([['References.collapseAll']])
})

test('refresh', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'References.refresh'() {
      return undefined
    },
  })

  await References.refresh()

  expect(mockRpc.invocations).toEqual([['References.refresh']])
})
