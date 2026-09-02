import { afterEach, expect, test } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import * as RendererProcess from '../src/parts/RendererProcess/RendererProcess.ts'
import * as DragAndDrop from '../src/parts/TestFrameWorkComponentDragAndDrop/TestFrameWorkComponentDragAndDrop.ts'

afterEach(() => {
  RendererProcess.state.rpc = undefined
})

test('createDropSession invokes renderer process', async () => {
  const rpc = createMockRpc({
    commandMap: {
      'TestFrameWork.createDropSession'() {
        return 42
      },
    },
  })
  RendererProcess.state.rpc = rpc
  const items = [
    { kind: 'string' as const, type: 'text/plain', value: 'hello' },
    { file: new File(['content'], 'test.txt'), kind: 'file' as const, type: 'text/plain' },
  ]

  expect(await DragAndDrop.createDropSession(items)).toBe(42)
  expect(rpc.invocations).toEqual([['TestFrameWork.createDropSession', items]])
})
