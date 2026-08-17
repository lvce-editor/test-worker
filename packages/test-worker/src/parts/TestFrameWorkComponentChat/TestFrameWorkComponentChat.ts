import * as DirectViewWorker from '../DirectViewWorker/DirectViewWorker.ts'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { DroppedFileHandle } from '../DroppedFileHandle/DroppedFileHandle.ts'
import type { MockRequestInput } from '../MockRequestInput/MockRequestInput.ts'

export const setReasoningPickerEnabled = async (enabled: boolean): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.setReasoningPickerEnabled', enabled)
}

export const setReasoningEffort = async (effort: string): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.setReasoningEffort', effort)
}

export const handleChatListContextMenu = async (eventX: number, eventY: number): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.handleChatListContextMenu', eventX, eventY)
}

export const setBackendUrl = async (url: string): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.setBackendUrl', url)
}

export const setUseOwnBackend = async (enabled: boolean): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.setUseOwnBackend', enabled)
}

export const handleClickBack = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.handleClickBack')
}

export const setNewChatModelPickerEnabled = async (enabled: boolean): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.setNewChatModelPickerEnabled', enabled)
}

export const openAgentModePicker = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.openAgentModePicker')
}

export const handleClickSettings = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.handleClickSettings')
}

export const selectIndex = async (index: number): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.selectIndex', index)
}

export const handleClickClose = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.handleClickClose')
}

export const shouldHaveComposerSelection = async (start: number, end: number): Promise<void> => {
  const selection = await DirectViewWorker.invoke('Chat', 'Chat.getComposerSelection')
  if (selection.start !== start || selection.end !== end) {
    throw new Error(`Expected selection to be { start: ${start}, end: ${end} }, but got { start: ${selection.start}, end: ${selection.end} }`)
  }
}

export const handleClickNew = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.handleClickNew')
}

export const enterNewLine = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.enterNewLine')
}

export const setScrollDownButtonEnabled = async (enabled: boolean): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.setScrollDownButtonEnabled', enabled)
}

export const show = async (): Promise<void> => {
  await RendererWorker.invoke('Layout.showSecondarySideBar')
  await DirectViewWorker.invoke('Chat', 'Chat.reset')
}

export const getSelectedSessionId = async (): Promise<string> => {
  return RendererWorker.invoke('Chat.getSelectedSessionId')
}

export const handleInput = async (text: string): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.handleInput', 'composer', text, 'script')
}

export const handleDropFiles = async (file: DroppedFileHandle): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.handleDropFiles', 'composer-drop-target', [file])
}

export const showComposerAttachmentPreviewOverlay = async (attachmentId: string): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.showComposerAttachmentPreviewOverlay', attachmentId)
}

export const handleErrorComposerAttachmentPreviewOverlay = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.handleErrorComposerAttachmentPreviewOverlay')
}

export const handleClickSessionDebug = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.handleClickSessionDebug')
}

export const handleChatHeaderContextMenu = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.handleChatHeaderContextMenu', 0, 0)
}

export const reset = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.reset')
}
export const handleMessagesScroll = async (id: number, x: number, y: number): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.handleMessagesScroll', id, x, y)
}

export const mockOpenApiStreamFinish = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.mockOpenApiStreamFinish')
}

export const mockOpenApiStreamPushChunk = async (chunk: string): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.mockOpenApiStreamPushChunk', chunk)
}

export const openMockSession = async (sessionId: string, messages: readonly any[]): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.openMockSession', sessionId, messages)
}

interface MockErrorResponse {
  readonly code: string
  readonly error: string
  readonly statusCode: number
}

export const mockBackendSetHttpErrorResponse = async (response: MockErrorResponse): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.mockBackendSetHttpErrorResponse', response.statusCode, response)
}

export interface MockResponseOptions {
  readonly text: string
}

export const registerMockResponse = async (options: MockResponseOptions): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.registerMockResponse', options)
}

export const handleSubmit = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.handleSubmit')
}

export const setStreamingEnabled = async (enabled: boolean): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.setStreamingEnabled', enabled)
}

export const useMockApi = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.useMockApi', true)
}

export const openGitBranchPicker = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.openGitBranchPicker')
}

export const closeGitBranchPicker = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.closeGitBranchPicker')
}

export const setAuthEnabled = async (enabled: boolean): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.setAuthEnabled', enabled)
}

export const mockBackendAuthResponse = async (response: any): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.mockBackendAuthResponse', response)
}

export const mockOpenApiRequestGetAll = async (): Promise<readonly any[]> => {
  return RendererWorker.invoke('Chat.mockOpenApiRequestGetAll')
}

export const rerender = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.rerender')
}

export const setSearchEnabled = async (enabled: boolean): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.setSearchEnabled', enabled)
}

export const mockOpenApiRequestReset = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.mockOpenApiRequestReset')
}

export const mockOpenApiStreamReset = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.mockOpenApiStreamReset')
}

export const openModelPicker = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.openModelPicker')
}
export const handleModelPickerInput = async (value: string): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.handleInput', 'model-picker-search', value)
}

export const handleClickDelete = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.handleClickDelete')
}

export const handleContextMenuChatImageAttachment = async (id: string, x: number, y: number): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.handleContextMenuChatImageAttachment', id, x, y)
}

export const setAddContextButtonEnabled = async (enabled: boolean): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.setAddContextButtonEnabled', enabled)
}

export const deleteSessionAtIndex = async (index: number): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.deleteSessionAtIndex', index)
}

export const handleModelChange = async (modelId: string): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.handleModelChange', modelId)
}

export const handleModelInputBlur = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.handleModelInputBlur')
}

export const handleInputPaste = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.handleInputPaste')
}

export const setQuestionToolEnabled = async (enabled: boolean): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.setQuestionToolEnabled', enabled)
}

export const handleInputCopy = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.handleInputCopy')
}

export const handleClickFileName = async (fileName: string): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.handleClickFileName', fileName)
}

export const handleInputCut = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.handleInputCut')
}

export const clearInput = async (): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.clearInput')
}

export const handleProjectListContextMenu = async (id: number, x: number, y: number): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.handleProjectListContextMenu', id, x, y)
}

export interface MockOpenAiResponseOptions {
  readonly status: number
  readonly value: any
}

export const mockOpenAiResponse = async (options: MockOpenAiResponseOptions): Promise<void> => {
  return RendererWorker.invoke('Chat.mockOpenAiResponse', options)
}

export const handleInputFocus = async (): Promise<void> => {
  return DirectViewWorker.invoke('Chat', 'Chat.handleInputFocus', 'chat-list')
}

export const openDebugView = async (): Promise<void> => {
  return DirectViewWorker.invoke('Chat', 'Chat.openDebugView')
}

export const chatListFocusPrevious = async (): Promise<void> => {
  return DirectViewWorker.invoke('Chat', 'Chat.chatListFocusPrevious')
}

export const chatListFocusFirst = async (): Promise<void> => {
  return DirectViewWorker.invoke('Chat', 'Chat.chatListFocusFirst')
}

export const chatListFocusLast = async (): Promise<void> => {
  return DirectViewWorker.invoke('Chat', 'Chat.chatListFocusLast')
}

export const chatListFocusNext = async (): Promise<void> => {
  return DirectViewWorker.invoke('Chat', 'Chat.chatListFocusNext')
}

export const setNowForTest = async (now: number): Promise<void> => {
  await DirectViewWorker.invoke('Chat', 'Chat.setNowForTest', now)
}

export const getAuthState = async (): Promise<any> => {
  return RendererWorker.invoke('Chat.getAuthState')
}

export const setShowChatListTime = async (showTime: boolean): Promise<any> => {
  return DirectViewWorker.invoke('Chat', 'Chat.setShowChatListTime', showTime)
}

export const handleAgentModeChange = async (newAgentMode: string): Promise<void> => {
  return DirectViewWorker.invoke('Chat', 'Chat.handleAgentModeChange', newAgentMode)
}

export const mockOpenApiSetResponse = async (items: readonly MockRequestInput[]): Promise<void> => {
  return DirectViewWorker.invoke('Chat', 'Chat.mockOpenApiSetResponse', items)
}
