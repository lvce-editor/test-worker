import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as ChatView2 from '../src/parts/TestFrameWorkComponentChatView2/TestFrameWorkComponentChatView2.ts'

test('show opens ChatView2 through its extension command', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCommand'() {
      return undefined
    },
  })

  await ChatView2.show()

  expect(mockRpc.invocations).toEqual([['Extensions.executeCommand', 'chat2.show']])
})

test('submit forwards the ChatView2 extension command', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCommand'() {
      return undefined
    },
  })

  await ChatView2.submit()

  expect(mockRpc.invocations).toEqual([['Extensions.executeCommand', 'chat2.submit']])
})

test('typeComposer types into the ChatView2 composer', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.performAction'() {
      return undefined
    },
  })

  await ChatView2.typeComposer('Inspect the workspace')

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.performAction', expect.objectContaining({ _selector: 'textarea[name="composer"]' }), 'type', { text: 'Inspect the workspace' }],
  ])
})

test('expandActivity clicks the ChatView2 activity toggle', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.performAction'() {
      return undefined
    },
  })

  await ChatView2.expandActivity()

  expect(mockRpc.invocations).toEqual([
    [
      'TestFrameWork.performAction',
      expect.objectContaining({ _selector: 'button[name="toggle-activity"]' }),
      'click',
      { bubbles: true, button: 0, cancable: true, detail: 1 },
    ],
  ])
})

test('show propagates asynchronous extension command failures', async () => {
  const error = new Error('ChatView2 failed to open')
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCommand'() {
      throw error
    },
  })

  await expect(ChatView2.show()).rejects.toThrow(error)
  expect(mockRpc.invocations).toEqual([['Extensions.executeCommand', 'chat2.show']])
})
