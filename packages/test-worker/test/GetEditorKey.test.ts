import { expect, test } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import * as GetEditorKey from '../src/parts/GetEditorKey/GetEditorKey.js'

test('getEditorKey function exists and is exported', () => {
  expect(GetEditorKey.getEditorKey).toBeDefined()
  expect(typeof GetEditorKey.getEditorKey).toBe('function')
})

test('getEditorKey returns last key from multiple editors', async () => {
  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getKeys'() {
      return ['1', '2', '3']
    },
  })

  const result = await GetEditorKey.getEditorKey()
  expect(typeof result).toBe('number')
  expect(result).toBe(3)

  // Verify the RPC was called
  expect(mockRpc.invocations).toEqual([['Editor.getKeys']])
})

test('getEditorKey handles single editor', async () => {
  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getKeys'() {
      return ['42']
    },
  })

  const result = await GetEditorKey.getEditorKey()
  expect(typeof result).toBe('number')
  expect(result).toBe(42)

  // Verify the RPC was called
  expect(mockRpc.invocations).toEqual([['Editor.getKeys']])
})

test('getEditorKey throws error when no editors found', async () => {
  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getKeys'() {
      return []
    },
  })

  await expect(GetEditorKey.getEditorKey()).rejects.toThrow('no editor found')

  // Verify the RPC was called
  expect(mockRpc.invocations).toEqual([['Editor.getKeys']])
})

test('getEditorKey handles numeric string conversion', async () => {
  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getKeys'() {
      return ['123', '456']
    },
  })

  const result = await GetEditorKey.getEditorKey()
  expect(typeof result).toBe('number')
  expect(result).toBe(456)

  // Verify the RPC was called
  expect(mockRpc.invocations).toEqual([['Editor.getKeys']])
})
