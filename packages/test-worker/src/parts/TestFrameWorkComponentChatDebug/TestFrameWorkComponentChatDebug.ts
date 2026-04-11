import { RendererWorker } from '@lvce-editor/rpc-registry'

export interface ChatDebugEvent {
  readonly [key: string]: unknown
}

export type ChatDebugInputName =
  | 'closeDetails'
  | 'eventCategoryFilter'
  | 'filter'
  | 'showEventStreamFinishedEvents'
  | 'showInputEvents'
  | 'showResponsePartEvents'
  | 'timelineRangePreset'
  | 'useDevtoolsLayout'

export const open = async (sessionId: string): Promise<void> => {
  await RendererWorker.invoke('Main.openUri', `chat-debug://${sessionId}`)
}

export const setEvents = async (events: readonly ChatDebugEvent[]): Promise<void> => {
  await RendererWorker.invoke('ChatDebug.setEvents', events)
}

export const setIndexedDbSupportForTest = async (supported: boolean): Promise<void> => {
  await RendererWorker.invoke('ChatDebug.setIndexedDbSupportForTest', supported)
}

export const resetIndexedDbSupportForTest = async (): Promise<void> => {
  await RendererWorker.invoke('ChatDebug.setIndexedDbSupportForTest')
}

export const selectEventRow = async (index: number): Promise<void> => {
  await RendererWorker.invoke('ChatDebug.handleEventRowClick', String(index))
}

export const handleInput = async (name: ChatDebugInputName, value: string, checked: boolean): Promise<void> => {
  await RendererWorker.invoke('ChatDebug.handleInput', name, value, checked)
}

export const useDevtoolsLayout = async (): Promise<void> => {
  await handleInput('useDevtoolsLayout', '', true)
}

export const setFilter = async (value: string): Promise<void> => {
  await handleInput('filter', value, false)
}

export const setEventCategoryFilter = async (value: string): Promise<void> => {
  await handleInput('eventCategoryFilter', value, false)
}

export const setTimelineRangePreset = async (value: string): Promise<void> => {
  await handleInput('timelineRangePreset', value, false)
}

export const setShowInputEvents = async (enabled: boolean): Promise<void> => {
  await handleInput('showInputEvents', '', enabled)
}

export const setShowResponsePartEvents = async (enabled: boolean): Promise<void> => {
  await handleInput('showResponsePartEvents', '', enabled)
}

export const setShowEventStreamFinishedEvents = async (enabled: boolean): Promise<void> => {
  await handleInput('showEventStreamFinishedEvents', '', enabled)
}

export const closeDetails = async (): Promise<void> => {
  await handleInput('closeDetails', 'close', false)
}

export const openTabPreview = async (): Promise<void> => {
  await RendererWorker.invoke('ChatDebug.handleInput', 'detailTab', 'preview', false)
}

export const openTabPayload = async (): Promise<void> => {
  await RendererWorker.invoke('ChatDebug.handleInput', 'detailTab', 'payload', false)
}

export const openTabResponse = async (): Promise<void> => {
  await RendererWorker.invoke('ChatDebug.handleInput', 'detailTab', 'response', false)
}

export const openTabTiming = async (): Promise<void> => {
  await RendererWorker.invoke('ChatDebug.handleInput', 'detailTab', 'timing', false)
}

export const setSessionId = async (sessionId: string): Promise<void> => {
  await RendererWorker.invoke('ChatDebug.setSessionId', sessionId)
}

export const appendStoredEventForTest = async (event: any): Promise<void> => {
  await RendererWorker.invoke('ChatDebug.appendStoredEventForTest', event)
}

export const handleClickRefresh = async (): Promise<void> => {
  await RendererWorker.invoke('ChatDebug.handleClickRefresh')
}
