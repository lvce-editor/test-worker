import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Chat from '../src/parts/TestFrameWorkComponentChat/TestFrameWorkComponentChat.ts'

test('handleChatListContextMenu', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.handleChatListContextMenu'() {
      return undefined
    },
  })
  await Chat.handleChatListContextMenu(10, 20)
  expect(mockRpc.invocations).toEqual([['Chat.handleChatListContextMenu', 10, 20]])
})

test('handleClickBack', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.handleClickBack'() {
      return undefined
    },
  })
  await Chat.handleClickBack()
  expect(mockRpc.invocations).toEqual([['Chat.handleClickBack']])
})

test('handleClickSettings', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.handleClickSettings'() {
      return undefined
    },
  })
  await Chat.handleClickSettings()
  expect(mockRpc.invocations).toEqual([['Chat.handleClickSettings']])
})

test('setNewChatModelPickerEnabled', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.setNewChatModelPickerEnabled'() {
      return undefined
    },
  })
  await Chat.setNewChatModelPickerEnabled(true)
  expect(mockRpc.invocations).toEqual([['Chat.setNewChatModelPickerEnabled', true]])
})

test('openAgentModePicker', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.openAgentModePicker'() {
      return undefined
    },
  })
  await Chat.openAgentModePicker()
  expect(mockRpc.invocations).toEqual([['Chat.openAgentModePicker']])
})

test('selectIndex', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.selectIndex'() {
      return undefined
    },
  })
  await Chat.selectIndex(3)
  expect(mockRpc.invocations).toEqual([['Chat.selectIndex', 3]])
})

test('handleClickClose', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.handleClickClose'() {
      return undefined
    },
  })
  await Chat.handleClickClose()
  expect(mockRpc.invocations).toEqual([['Chat.handleClickClose']])
})

test('handleClickNew', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.handleClickNew'() {
      return undefined
    },
  })
  await Chat.handleClickNew()
  expect(mockRpc.invocations).toEqual([['Chat.handleClickNew']])
})

test('enterNewLine', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.enterNewLine'() {
      return undefined
    },
  })
  await Chat.enterNewLine()
  expect(mockRpc.invocations).toEqual([['Chat.enterNewLine']])
})

test('show', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.reset'() {
      return undefined
    },
    'Layout.showSecondarySideBar'() {
      return undefined
    },
  })
  await Chat.show()
  expect(mockRpc.invocations).toEqual([['Layout.showSecondarySideBar'], ['Chat.reset']])
})

test('getSelectedSessionId', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.getSelectedSessionId'() {
      return 'session-1'
    },
  })
  const result = await Chat.getSelectedSessionId()
  expect(result).toBe('session-1')
  expect(mockRpc.invocations).toEqual([['Chat.getSelectedSessionId']])
})

test('handleInput', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.handleInput'() {
      return undefined
    },
  })
  await Chat.handleInput('hello')
  expect(mockRpc.invocations).toEqual([['Chat.handleInput', 'composer', 'hello', 'script']])
})

test('handleDropFiles', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.handleDropFiles'() {
      return undefined
    },
  })
  const file = {
    file: new File(['content'], 'test.txt', { type: 'text/plain' }),
    id: 1,
  }
  await Chat.handleDropFiles(file)
  expect(mockRpc.invocations).toEqual([['Chat.handleDropFiles', 'composer-drop-target', [file]]])
})

test('handleClickSessionDebug', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.handleClickSessionDebug'() {
      return undefined
    },
  })
  await Chat.handleClickSessionDebug()
  expect(mockRpc.invocations).toEqual([['Chat.handleClickSessionDebug']])
})

test('handleChatHeaderContextMenu', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.handleChatHeaderContextMenu'() {
      return undefined
    },
  })
  await Chat.handleChatHeaderContextMenu()
  expect(mockRpc.invocations).toEqual([['Chat.handleChatHeaderContextMenu', 0, 0]])
})

test('reset', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.reset'() {
      return undefined
    },
  })
  await Chat.reset()
  expect(mockRpc.invocations).toEqual([['Chat.reset']])
})

test('mockOpenApiStreamFinish', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.mockOpenApiStreamFinish'() {
      return undefined
    },
  })
  await Chat.mockOpenApiStreamFinish()
  expect(mockRpc.invocations).toEqual([['Chat.mockOpenApiStreamFinish']])
})

test('mockOpenApiStreamPushChunk', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.mockOpenApiStreamPushChunk'() {
      return undefined
    },
  })
  await Chat.mockOpenApiStreamPushChunk('chunk-1')
  expect(mockRpc.invocations).toEqual([['Chat.mockOpenApiStreamPushChunk', 'chunk-1']])
})

test('handleSubmit', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.handleSubmit'() {
      return undefined
    },
  })
  await Chat.handleSubmit()
  expect(mockRpc.invocations).toEqual([['Chat.handleSubmit']])
})

test('setStreamingEnabled', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.setStreamingEnabled'() {
      return undefined
    },
  })
  await Chat.setStreamingEnabled(true)
  expect(mockRpc.invocations).toEqual([['Chat.setStreamingEnabled', true]])
})

test('useMockApi', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.useMockApi'() {
      return undefined
    },
  })
  await Chat.useMockApi()
  expect(mockRpc.invocations).toEqual([['Chat.useMockApi', true]])
})

test('setAuthEnabled', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.setAuthEnabled'() {
      return undefined
    },
  })
  await Chat.setAuthEnabled(false)
  expect(mockRpc.invocations).toEqual([['Chat.setAuthEnabled', false]])
})

test('mockBackendAuthResponse', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.mockBackendAuthResponse'() {
      return undefined
    },
  })
  const response = {
    ok: true,
  }
  await Chat.mockBackendAuthResponse(response)
  expect(mockRpc.invocations).toEqual([['Chat.mockBackendAuthResponse', response]])
})

test('mockOpenApiRequestGetAll', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.mockOpenApiRequestGetAll'() {
      return [{ id: 1 }]
    },
  })
  const result = await Chat.mockOpenApiRequestGetAll()
  expect(result).toEqual([{ id: 1 }])
  expect(mockRpc.invocations).toEqual([['Chat.mockOpenApiRequestGetAll']])
})

test('rerender', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.rerender'() {
      return undefined
    },
  })
  await Chat.rerender()
  expect(mockRpc.invocations).toEqual([['Chat.rerender']])
})

test('mockOpenApiRequestReset', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.mockOpenApiRequestReset'() {
      return undefined
    },
  })
  await Chat.mockOpenApiRequestReset()
  expect(mockRpc.invocations).toEqual([['Chat.mockOpenApiRequestReset']])
})

test('mockOpenApiStreamReset', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.mockOpenApiStreamReset'() {
      return undefined
    },
  })
  await Chat.mockOpenApiStreamReset()
  expect(mockRpc.invocations).toEqual([['Chat.mockOpenApiStreamReset']])
})

test('handleClickDelete', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.handleClickDelete'() {
      return undefined
    },
  })
  await Chat.handleClickDelete()
  expect(mockRpc.invocations).toEqual([['Chat.handleClickDelete']])
})

test('deleteSessionAtIndex', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.deleteSessionAtIndex'() {
      return undefined
    },
  })
  await Chat.deleteSessionAtIndex(2)
  expect(mockRpc.invocations).toEqual([['Chat.deleteSessionAtIndex', 2]])
})

test('handleModelChange', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.handleModelChange'() {
      return undefined
    },
  })
  await Chat.handleModelChange('gpt-5.3-codex')
  expect(mockRpc.invocations).toEqual([['Chat.handleModelChange', 'gpt-5.3-codex']])
})

test('handleModelInputBlur', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.handleModelInputBlur'() {
      return undefined
    },
  })
  const result = await Chat.handleModelInputBlur()
  expect(result).toBeUndefined()
  expect(mockRpc.invocations).toEqual([['Chat.handleModelInputBlur']])
})

test('handleInputPaste', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.handleInputPaste'() {
      return undefined
    },
  })
  await Chat.handleInputPaste()
  expect(mockRpc.invocations).toEqual([['Chat.handleInputPaste']])
})

test('handleInputCopy', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.handleInputCopy'() {
      return undefined
    },
  })
  await Chat.handleInputCopy()
  expect(mockRpc.invocations).toEqual([['Chat.handleInputCopy']])
})

test('handleInputCut', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.handleInputCut'() {
      return undefined
    },
  })
  await Chat.handleInputCut()
  expect(mockRpc.invocations).toEqual([['Chat.handleInputCut']])
})

test('clearInput', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.clearInput'() {
      return undefined
    },
  })
  await Chat.clearInput()
  expect(mockRpc.invocations).toEqual([['Chat.clearInput']])
})

test('mockOpenAiResponse', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.mockOpenAiResponse'() {
      return undefined
    },
  })
  const options = {
    status: 200,
    value: { id: 'response-1' },
  }
  const result = await Chat.mockOpenAiResponse(options)
  expect(result).toBeUndefined()
  expect(mockRpc.invocations).toEqual([['Chat.mockOpenAiResponse', options]])
})

test('handleInputFocus', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.handleInputFocus'() {
      return undefined
    },
  })
  const result = await Chat.handleInputFocus()
  expect(result).toBeUndefined()
  expect(mockRpc.invocations).toEqual([['Chat.handleInputFocus', 'chat-list']])
})

test('getAuthState', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.getAuthState'() {
      return {
        authenticated: true,
      }
    },
  })
  const result = await Chat.getAuthState()
  expect(result).toEqual({
    authenticated: true,
  })
  expect(mockRpc.invocations).toEqual([['Chat.getAuthState']])
})

test('setReasoningPickerEnabled', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.setReasoningPickerEnabled'() {
      return undefined
    },
  })
  await Chat.setReasoningPickerEnabled(true)
  expect(mockRpc.invocations).toEqual([['Chat.setReasoningPickerEnabled', true]])
})

test('setReasoningEffort', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.setReasoningEffort'() {
      return undefined
    },
  })
  await Chat.setReasoningEffort('high')
  expect(mockRpc.invocations).toEqual([['Chat.setReasoningEffort', 'high']])
})

test('setBackendUrl', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.setBackendUrl'() {
      return undefined
    },
  })
  await Chat.setBackendUrl('http://localhost:3000')
  expect(mockRpc.invocations).toEqual([['Chat.setBackendUrl', 'http://localhost:3000']])
})

test('setScrollDownButtonEnabled', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.setScrollDownButtonEnabled'() {
      return undefined
    },
  })
  await Chat.setScrollDownButtonEnabled(false)
  expect(mockRpc.invocations).toEqual([['Chat.setScrollDownButtonEnabled', false]])
})

test('showComposerAttachmentPreviewOverlay', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.showComposerAttachmentPreviewOverlay'() {
      return undefined
    },
  })
  await Chat.showComposerAttachmentPreviewOverlay('attachment-1')
  expect(mockRpc.invocations).toEqual([['Chat.showComposerAttachmentPreviewOverlay', 'attachment-1']])
})

test('handleMessagesScroll', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.handleMessagesScroll'() {
      return undefined
    },
  })
  await Chat.handleMessagesScroll(1, 10, 20)
  expect(mockRpc.invocations).toEqual([['Chat.handleMessagesScroll', 1, 10, 20]])
})

test('openMockSession', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.openMockSession'() {
      return undefined
    },
  })
  const messages = [{ content: 'hello', role: 'user' }]
  await Chat.openMockSession('session-1', messages)
  expect(mockRpc.invocations).toEqual([['Chat.openMockSession', 'session-1', messages]])
})

test('openGitBranchPicker', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.openGitBranchPicker'() {
      return undefined
    },
  })
  await Chat.openGitBranchPicker()
  expect(mockRpc.invocations).toEqual([['Chat.openGitBranchPicker']])
})

test('closeGitBranchPicker', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.closeGitBranchPicker'() {
      return undefined
    },
  })
  await Chat.closeGitBranchPicker()
  expect(mockRpc.invocations).toEqual([['Chat.closeGitBranchPicker']])
})

test('setSearchEnabled', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.setSearchEnabled'() {
      return undefined
    },
  })
  await Chat.setSearchEnabled(true)
  expect(mockRpc.invocations).toEqual([['Chat.setSearchEnabled', true]])
})

test('openModelPicker', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.openModelPicker'() {
      return undefined
    },
  })
  await Chat.openModelPicker()
  expect(mockRpc.invocations).toEqual([['Chat.openModelPicker']])
})

test('setAddContextButtonEnabled', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.setAddContextButtonEnabled'() {
      return undefined
    },
  })
  await Chat.setAddContextButtonEnabled(false)
  expect(mockRpc.invocations).toEqual([['Chat.setAddContextButtonEnabled', false]])
})

test('setQuestionToolEnabled', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.setQuestionToolEnabled'() {
      return undefined
    },
  })
  await Chat.setQuestionToolEnabled(true)
  expect(mockRpc.invocations).toEqual([['Chat.setQuestionToolEnabled', true]])
})

test('handleClickFileName', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.handleClickFileName'() {
      return undefined
    },
  })
  await Chat.handleClickFileName('src/test.ts')
  expect(mockRpc.invocations).toEqual([['Chat.handleClickFileName', 'src/test.ts']])
})

test('handleProjectListContextMenu', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.handleProjectListContextMenu'() {
      return undefined
    },
  })
  await Chat.handleProjectListContextMenu(5, 10, 20)
  expect(mockRpc.invocations).toEqual([['Chat.handleProjectListContextMenu', 5, 10, 20]])
})

test('handleAgentModeChange', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.handleAgentModeChange'() {
      return undefined
    },
  })
  const result = await Chat.handleAgentModeChange('agent')
  expect(result).toBeUndefined()
  expect(mockRpc.invocations).toEqual([['Chat.handleAgentModeChange', 'agent']])
})
