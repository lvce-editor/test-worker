/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { DroppedFileHandle } from '../DroppedFileHandle/DroppedFileHandle.ts'
import * as Command from '../TestFrameWorkComponentCommand/TestFrameWorkComponentCommand.ts'

export const handleChatListContextMenu = async (eventX: number, eventY: number): Promise<void> => {
  await RendererWorker.invoke('Chat.handleChatListContextMenu', eventX, eventY)
}

export const setBackendUrl = async (url: string): Promise<void> => {
  await RendererWorker.invoke('Chat.setBackendUrl', url)
}

export const handleClickBack = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.handleClickBack')
}

export const setNewChatModelPickerEnabled = async (enabled: boolean): Promise<void> => {
  await RendererWorker.invoke('Chat.setNewChatModelPickerEnabled', enabled)
}

export const openAgentModePicker = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.openAgentModePicker')
}

export const handleClickSettings = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.handleClickSettings')
}

export const selectIndex = async (index: number): Promise<void> => {
  await RendererWorker.invoke('Chat.selectIndex', index)
}

export const handleClickClose = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.handleClickClose')
}

export const handleClickNew = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.handleClickNew')
}

export const enterNewLine = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.enterNewLine')
}

export const show = async (): Promise<void> => {
  await RendererWorker.invoke('Layout.showSecondarySideBar')
  await RendererWorker.invoke('Chat.reset')
}

export const getSelectedSessionId = async (): Promise<string> => {
  return RendererWorker.invoke('Chat.getSelectedSessionId')
}

export const handleInput = async (text: string): Promise<void> => {
  await RendererWorker.invoke('Chat.handleInput', 'composer', text, 'script')
}

export const handleDropFiles = async (file: DroppedFileHandle): Promise<void> => {
  await Command.execute('Chat.handleDropFiles', 'composer-drop-target', [file])
}

export const handleClickSessionDebug = async (): Promise<void> => {
  await Command.execute('Chat.handleClickSessionDebug')
}

export const handleChatHeaderContextMenu = async (): Promise<void> => {
  await Command.execute('Chat.handleChatHeaderContextMenu', 0, 0)
}

export const reset = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.reset')
}

export const mockOpenApiStreamFinish = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.mockOpenApiStreamFinish')
}

export const mockOpenApiStreamPushChunk = async (chunk: string): Promise<void> => {
  await RendererWorker.invoke('Chat.mockOpenApiStreamPushChunk', chunk)
}

export const openMockSession = async (sessionId: string, messages: readonly any[]): Promise<void> => {
  await RendererWorker.invoke('Chat.openMockSession', sessionId, messages)
}

export const handleSubmit = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.handleSubmit')
}

export const setStreamingEnabled = async (enabled: boolean): Promise<void> => {
  await RendererWorker.invoke('Chat.setStreamingEnabled', enabled)
}

export const useMockApi = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.useMockApi', true)
}

export const setAuthEnabled = async (enabled: boolean): Promise<void> => {
  await RendererWorker.invoke('Chat.setAuthEnabled', enabled)
}

export const mockBackendAuthResponse = async (response: any): Promise<void> => {
  await RendererWorker.invoke('Chat.mockBackendAuthResponse', response)
}

export const mockOpenApiRequestGetAll = async (): Promise<readonly any[]> => {
  return RendererWorker.invoke('Chat.mockOpenApiRequestGetAll')
}

export const rerender = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.rerender')
}

export const setSearchEnabled = async (enabled: boolean): Promise<void> => {
  await RendererWorker.invoke('Chat.setSearchEnabled', enabled)
}

export const mockOpenApiRequestReset = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.mockOpenApiRequestReset')
}

export const mockOpenApiStreamReset = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.mockOpenApiStreamReset')
}

export const openModelPicker = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.openModelPicker')
}

export const handleClickDelete = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.handleClickDelete')
}

export const deleteSessionAtIndex = async (index: number): Promise<void> => {
  await RendererWorker.invoke('Chat.deleteSessionAtIndex', index)
}

export const handleModelChange = async (modelId: string): Promise<void> => {
  await RendererWorker.invoke('Chat.handleModelChange', modelId)
}

export const handleModelInputBlur = async (): Promise<void> => {
  await Command.execute('Chat.handleModelInputBlur')
}

export const handleInputPaste = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.handleInputPaste')
}

export const handleInputCopy = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.handleInputCopy')
}

export const handleInputCut = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.handleInputCut')
}

export const clearInput = async (): Promise<void> => {
  await Command.execute('Chat.clearInput')
}

export interface MockOpenAiResponseOptions {
  readonly status: number
  readonly value: any
}

export const mockOpenAiResponse = async (options: MockOpenAiResponseOptions): Promise<void> => {
  return RendererWorker.invoke('Chat.mockOpenAiResponse', options)
}

export const handleInputFocus = async (): Promise<void> => {
  return Command.execute('Chat.handleInputFocus', 'chat-list')
}

export const getAuthState = async (): Promise<any> => {
  return RendererWorker.invoke('Chat.getAuthState')
}
