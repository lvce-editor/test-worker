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

test('open2 without optional inputs', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri'() {
      return undefined
    },
  })
  await ChatDebug.open2({
    sessionId: 'e2e-session',
    useDevtoolsLayout: false,
  })
  expect(mockRpc.invocations).toEqual([['Main.openUri', 'chat-debug://e2e-session']])
})

test('open2 with events and devtools layout', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleInput'() {
      return undefined
    },
    'ChatDebug.setEvents'() {
      return undefined
    },
    'Main.openUri'() {
      return undefined
    },
  })
  const events = [
    {
      sessionId: 'e2e-session',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'response',
    },
  ]
  await ChatDebug.open2({
    events,
    sessionId: 'e2e-session',
    useDevtoolsLayout: true,
  })
  expect(mockRpc.invocations).toEqual([
    ['Main.openUri', 'chat-debug://e2e-session'],
    ['ChatDebug.setEvents', events],
    ['ChatDebug.handleInput', 'useDevtoolsLayout', '', true],
  ])
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

test('setEventCategoryFilter', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleInput'() {
      return undefined
    },
  })
  await ChatDebug.setEventCategoryFilter('request')
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleInput', 'eventCategoryFilter', 'request', false]])
})

test('setTimelineRangePreset', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleInput'() {
      return undefined
    },
  })
  await ChatDebug.setTimelineRangePreset('all')
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleInput', 'timelineRangePreset', 'all', false]])
})

test('setShowInputEvents', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleInput'() {
      return undefined
    },
  })
  await ChatDebug.setShowInputEvents(true)
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleInput', 'showInputEvents', '', true]])
})

test('setShowResponsePartEvents', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleInput'() {
      return undefined
    },
  })
  await ChatDebug.setShowResponsePartEvents(true)
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleInput', 'showResponsePartEvents', '', true]])
})

test('setShowEventStreamFinishedEvents', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleInput'() {
      return undefined
    },
  })
  await ChatDebug.setShowEventStreamFinishedEvents(true)
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleInput', 'showEventStreamFinishedEvents', '', true]])
})

test('handleInput', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleInput'() {
      return undefined
    },
  })
  await ChatDebug.handleInput('filter', 'alpha', false)
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleInput', 'filter', 'alpha', false]])
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

test('openTabPreview', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleInput'() {
      return undefined
    },
  })
  await ChatDebug.openTabPreview()
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleInput', 'detailTab', 'preview', false]])
})

test('openTabPayload', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleInput'() {
      return undefined
    },
  })
  await ChatDebug.openTabPayload()
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleInput', 'detailTab', 'payload', false]])
})

test('openTabResponse', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleInput'() {
      return undefined
    },
  })
  await ChatDebug.openTabResponse()
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleInput', 'detailTab', 'response', false]])
})

test('openTabTiming', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleInput'() {
      return undefined
    },
  })
  await ChatDebug.openTabTiming()
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleInput', 'detailTab', 'timing', false]])
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

test('setSessionId', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.setSessionId'() {
      return undefined
    },
  })
  await ChatDebug.setSessionId('session-1')
  expect(mockRpc.invocations).toEqual([['ChatDebug.setSessionId', 'session-1']])
})

test('appendStoredEventForTest', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.appendStoredEventForTest'() {
      return undefined
    },
  })
  const event = {
    sessionId: 'session-1',
    type: 'request',
  }
  await ChatDebug.appendStoredEventForTest(event)
  expect(mockRpc.invocations).toEqual([['ChatDebug.appendStoredEventForTest', event]])
})

test('handleClickRefresh', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleClickRefresh'() {
      return undefined
    },
  })
  await ChatDebug.handleClickRefresh()
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleClickRefresh']])
})

test('handleTimelineDoubleClick', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleTimelineDoubleClick'() {
      return undefined
    },
  })
  await ChatDebug.handleTimelineDoubleClick()
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleTimelineDoubleClick']])
})

test('toggleHeadersSection', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleInput'() {
      return undefined
    },
  })
  await ChatDebug.toggleHeadersSection('request')
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleInput', 'toggleHeadersSection', 'request', false]])
})

test('handleRootContextMenu', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleRootContextMenu'() {
      return undefined
    },
  })
  await ChatDebug.handleRootContextMenu()
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleRootContextMenu']])
})

test('handleHeaderContextMenu', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleHeaderContextMenu'() {
      return undefined
    },
  })
  await ChatDebug.handleHeaderContextMenu(10, 20)
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleHeaderContextMenu', 10, 20]])
})

test('handlePreviewTextPointerDown', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handlePreviewTextPointerDown'() {
      return undefined
    },
  })
  await ChatDebug.handlePreviewTextPointerDown(11, 22)
  expect(mockRpc.invocations).toEqual([['ChatDebug.handlePreviewTextPointerDown', 11, 22]])
})

test('handleTableFocus', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleTableFocus'() {
      return undefined
    },
  })
  await ChatDebug.handleTableFocus()
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleTableFocus']])
})

test('handleTimelinePointerDown', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleTimelinePointerDown'() {
      return undefined
    },
  })
  await ChatDebug.handleTimelinePointerDown('request', 101, 202)
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleTimelinePointerDown', 'request', 101, 202]])
})

test('handleTimelinePointerMove', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleTimelinePointerMove'() {
      return undefined
    },
  })
  await ChatDebug.handleTimelinePointerMove(303)
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleTimelinePointerMove', 303]])
})

test('handleTimelinePointerUp', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleTimelinePointerUp'() {
      return undefined
    },
  })
  await ChatDebug.handleTimelinePointerUp(404)
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleTimelinePointerUp', 404]])
})

test('openTabTokens', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleInput'() {
      return undefined
    },
  })
  await ChatDebug.openTabTokens()
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleInput', 'detailTab', 'tokens', false]])
})

test('openTabHeaders', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleInput'() {
      return undefined
    },
  })
  await ChatDebug.openTabHeaders()
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleInput', 'detailTab', 'headers', false]])
})

test('handleTableBodyContextMenu', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.handleTableBodyContextMenu'() {
      return undefined
    },
  })
  await ChatDebug.handleTableBodyContextMenu(55, 66)
  expect(mockRpc.invocations).toEqual([['ChatDebug.handleTableBodyContextMenu', 55, 66]])
})
