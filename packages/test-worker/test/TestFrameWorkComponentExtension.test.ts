import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as Extension from '../src/parts/TestFrameWorkComponentExtension/TestFrameWorkComponentExtension.ts'

test('addWebExtension', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionMeta.addWebExtension'() {
      return undefined
    },
  })
  using mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.addWebExtension'() {
      return undefined
    },
  })

  await Extension.addWebExtension('extensions/web')

  expect(mockRpc.invocations).toEqual([['ExtensionMeta.addWebExtension', 'extensions/web']])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.addWebExtension', 'extensions/web']])
})

test('addNodeExtension', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionMeta.addNodeExtension'() {
      return undefined
    },
  })

  await Extension.addNodeExtension('extensions/node')

  expect(mockRpc.invocations).toEqual([['ExtensionMeta.addNodeExtension', 'extensions/node']])
})

test('executeFormattingProvider', async () => {
  using mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeFormattingProvider'() {
      return [{ endOffset: 13, inserted: 'const value = 1', startOffset: 0 }]
    },
  })

  const textDocument = {
    languageId: 'javascript',
    text: 'const value=1',
    uri: '/test.js',
  }

  await expect(Extension.executeFormattingProvider(textDocument)).resolves.toEqual([{ endOffset: 13, inserted: 'const value = 1', startOffset: 0 }])

  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.executeFormattingProvider', textDocument]])
})

test('executeCompletionProvider', async () => {
  using mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCompletionProvider'() {
      return [{ label: 'console' }]
    },
  })

  const textDocument = {
    languageId: 'javascript',
    text: 'con',
    uri: '/test.js',
  }

  await expect(Extension.executeCompletionProvider(textDocument, 3)).resolves.toEqual([{ label: 'console' }])

  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.executeCompletionProvider', textDocument, 3]])
})
