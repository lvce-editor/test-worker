import { afterEach, expect, test } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
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

test('getDragData returns the prepared payload', async () => {
  const dragData = { items: [{ data: 'live-component-state:///7.json', type: 'text/uri-list' }], label: 'Explorer' }
  using mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.getDragData'() {
      return dragData
    },
  })

  await expect(DragAndDrop.getDragData()).resolves.toBe(dragData)
  expect(mockRpc.invocations).toEqual([['Viewlet.getDragData']])
})

test('getDragData reports missing drag data', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.getDragData'() {
      return null
    },
  })

  await expect(DragAndDrop.getDragData()).rejects.toThrow('Expected drag data to be available')
  expect(mockRpc.invocations).toEqual([['Viewlet.getDragData']])
})

test('shouldHaveDragData compares MIME types and values independently of their order', async () => {
  const items = [
    { data: 'live-component-state:///7.json', type: 'text/uri-list' },
    { data: 'live-component-state:///7.json', type: 'text/plain' },
  ]
  using mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.getDragData'() {
      return { items, label: 'Explorer' }
    },
  })

  await DragAndDrop.shouldHaveDragData(items.toReversed())
  expect(mockRpc.invocations).toEqual([['Viewlet.getDragData']])
})

test.each([
  { expected: [] },
  { expected: [{ data: 'wrong URI', type: 'text/uri-list' }] },
  { expected: [{ data: 'live-component-state:///7.json', type: 'text/plain' }] },
])('shouldHaveDragData rejects a mismatched payload: %j', async ({ expected }) => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.getDragData'() {
      return { items: [{ data: 'live-component-state:///7.json', type: 'text/uri-list' }] }
    },
  })

  await expect(DragAndDrop.shouldHaveDragData(expected)).rejects.toThrow('Expected drag data')
  expect(mockRpc.invocations).toEqual([['Viewlet.getDragData']])
})

test('createDropSessionFromDragData preserves every prepared MIME type and URI', async () => {
  const uri = 'live-component-state:///0.25.json'
  using mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.getDragData'() {
      return {
        items: [
          { data: uri, type: 'text/uri-list' },
          { data: uri, type: 'text/plain' },
        ],
      }
    },
  })
  const rpc = createMockRpc({
    commandMap: {
      'TestFrameWork.createDropSession'() {
        return 42
      },
    },
  })
  RendererProcess.state.rpc = rpc

  await expect(DragAndDrop.createDropSessionFromDragData()).resolves.toBe(42)
  expect(mockRpc.invocations).toEqual([['Viewlet.getDragData']])
  expect(rpc.invocations).toEqual([
    [
      'TestFrameWork.createDropSession',
      [
        { kind: 'string', type: 'text/uri-list', value: uri },
        { kind: 'string', type: 'text/plain', value: uri },
      ],
    ],
  ])
})
