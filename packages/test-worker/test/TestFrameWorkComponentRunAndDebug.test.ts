import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as RunAndDebug from '../src/parts/TestFrameWorkComponentRunAndDebug/TestFrameWorkComponentRunAndDebug.ts'

test('show', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SideBar.openViewlet'() {
      return undefined
    },
  })

  await RunAndDebug.show()
  expect(mockRpc.invocations).toEqual([['SideBar.openViewlet', 'Run And Debug']])
})

test('handleClickSectionBreakPoints', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Run And Debug.handleClickSectionBreakPoints'() {
      return undefined
    },
  })

  await RunAndDebug.handleClickSectionBreakPoints()
  expect(mockRpc.invocations).toEqual([['Run And Debug.handleClickSectionBreakPoints']])
})

test('handleClickSectionWatch', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Run And Debug.handleClickSectionWatch'() {
      return undefined
    },
  })

  await RunAndDebug.handleClickSectionWatch()
  expect(mockRpc.invocations).toEqual([['Run And Debug.handleClickSectionWatch']])
})

test('addWatchExpression', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Run And Debug.addWatchExpression'() {
      return undefined
    },
  })

  await RunAndDebug.addWatchExpression('a + b')
  expect(mockRpc.invocations).toEqual([['Run And Debug.addWatchExpression', 'a + b']])
})

test('handleWatchValueChange', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Run And Debug.handleWatchValueChange'() {
      return undefined
    },
  })

  await RunAndDebug.handleWatchValueChange()
  expect(mockRpc.invocations).toEqual([['Run And Debug.handleWatchValueChange']])
})

test('acceptWatchExpressionEdit', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Run And Debug.acceptWatchExpressionEdit'() {
      return undefined
    },
  })

  await RunAndDebug.acceptWatchExpressionEdit()
  expect(mockRpc.invocations).toEqual([['Run And Debug.acceptWatchExpressionEdit']])
})

test('selectIndex', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Run And Debug.selectIndex'() {
      return undefined
    },
  })

  await RunAndDebug.selectIndex(3)
  expect(mockRpc.invocations).toEqual([['Run And Debug.selectIndex', 3]])
})

test('setPauseOnExceptions', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Run And Debug.setPauseOnExceptions'() {
      return undefined
    },
  })

  await RunAndDebug.setPauseOnExceptions(1)
  expect(mockRpc.invocations).toEqual([['Run And Debug.setPauseOnExceptions', 1]])
})

test('handleRename', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Run And Debug.handleRename'() {
      return undefined
    },
  })

  await RunAndDebug.handleRename()
  expect(mockRpc.invocations).toEqual([['Run And Debug.handleRename']])
})

test('handleSpace', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Run And Debug.handleSpace'() {
      return undefined
    },
  })

  await RunAndDebug.handleSpace()
  expect(mockRpc.invocations).toEqual([['Run And Debug.handleSpace']])
})
