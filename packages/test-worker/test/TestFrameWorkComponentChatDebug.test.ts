import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ChatDebug from '../src/parts/TestFrameWorkComponentChatDebug/TestFrameWorkComponentChatDebug.ts'

test('open', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri'() {
      return undefined
    },
  })
  await ChatDebug.open('e2e-session')
  expect(mockRpc.invocations).toEqual([['Main.openUri', 'chat-debug://e2e-session']])
})

test('setEvents', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.setEvents'() {
      return undefined
    },
  })
  const events = [
    {
      sessionId: 'e2e-session',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  await ChatDebug.setEvents(events)
  expect(mockRpc.invocations).toEqual([['ChatDebug.setEvents', events]])
})

test('useDevtoolsLayout', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleInput'() {
      return undefined
    },
  })
  await ChatDebug.useDevtoolsLayout()
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleInput', 'useDevtoolsLayout', '', true]])
})

test('setFilter', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleInput'() {
      return undefined
    },
  })
  await ChatDebug.setFilter('beta')
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleInput', 'filter', 'beta', false]])
})

test('selectEventRow', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleEventRowClick'() {
      return undefined
    },
  })
  await ChatDebug.selectEventRow(3)
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleEventRowClick', '3']])
})

test('closeDetails', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleInput'() {
      return undefined
    },
  })
  await ChatDebug.closeDetails()
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleInput', 'closeDetails', 'close', false]])
})

test('setIndexedDbSupportForTest', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.setIndexedDbSupportForTest'() {
      return undefined
    },
  })
  await ChatDebug.setIndexedDbSupportForTest(false)
  expect(mockRpc.invocations).toEqual([['ChatDebug.setIndexedDbSupportForTest', false]])
})

test('resetIndexedDbSupportForTest', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.setIndexedDbSupportForTest'() {
      return undefined
    },
  })
  await ChatDebug.resetIndexedDbSupportForTest()
  expect(mockRpc.invocations).toEqual([['ChatDebug.setIndexedDbSupportForTest']])
})
