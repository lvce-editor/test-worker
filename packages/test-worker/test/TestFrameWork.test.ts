import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as TestFrameWork from '../src/parts/TestFrameWork/TestFrameWork.ts'
import * as TestState from '../src/parts/TestState/TestState.ts'

const pendingTestFn = (): void => {}

test('getTmpDir returns memfs root', async () => {
  const result = await TestFrameWork.getTmpDir()
  expect(result).toBe('memfs://')
})

test('registers named pending test', async () => {
  await TestFrameWork.test('sample', pendingTestFn)

  const pendingTests = TestState.getTests()
  expect(pendingTests).toHaveLength(1)
  expect(pendingTests[0]).toEqual({
    fn: pendingTestFn,
    name: 'sample',
  })
  expect(pendingTestFn.name).toBe('test/sample')
})

test('skipTest shows skip overlay', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.showOverlay'() {
      return undefined
    },
  })

  await TestFrameWork.skipTest('case-1')

  expect(mockRpc.invocations).toEqual([['TestFrameWork.showOverlay', 'skip', 'yellow', 'test skipped case-1']])
})
