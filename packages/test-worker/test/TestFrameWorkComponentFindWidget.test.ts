import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as FindWidget from '../src/parts/TestFrameWorkComponentFindWidget/TestFrameWorkComponentFindWidget.ts'

test('focusNext', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FindWidget.focusNext'() {
      return undefined
    },
  })

  await FindWidget.focusNext()

  expect(mockRpc.invocations).toEqual([['FindWidget.focusNext']])
})

test('setValue', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FindWidget.handleInput'() {
      return undefined
    },
  })

  await FindWidget.setValue('hello')

  expect(mockRpc.invocations).toEqual([['FindWidget.handleInput', 'hello', 2]])
})

test('focusPrevious', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FindWidget.focusPrevious'() {
      return undefined
    },
  })

  await FindWidget.focusPrevious()

  expect(mockRpc.invocations).toEqual([['FindWidget.focusPrevious']])
})

test('close', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FindWidget.close'() {
      return undefined
    },
  })

  await FindWidget.close()

  expect(mockRpc.invocations).toEqual([['FindWidget.close']])
})

test('setReplaceValue', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FindWidget.handleReplaceInput'() {
      return undefined
    },
  })

  await FindWidget.setReplaceValue('replace text')

  expect(mockRpc.invocations).toEqual([['FindWidget.handleReplaceInput', 'replace text', 2]])
})

test('toggleReplace', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FindWidget.toggleReplace'() {
      return undefined
    },
  })

  await FindWidget.toggleReplace()

  expect(mockRpc.invocations).toEqual([['FindWidget.toggleReplace']])
})

test('toggleMatchCase', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FindWidget.toggleMatchCase'() {
      return undefined
    },
  })

  await FindWidget.toggleMatchCase()

  expect(mockRpc.invocations).toEqual([['FindWidget.toggleMatchCase']])
})

test('toggleMatchWholeWord', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FindWidget.toggleMatchWholeWord'() {
      return undefined
    },
  })

  await FindWidget.toggleMatchWholeWord()

  expect(mockRpc.invocations).toEqual([['FindWidget.toggleMatchWholeWord']])
})

test('togglePreserveCase', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FindWidget.togglePreserveCase'() {
      return undefined
    },
  })

  await FindWidget.togglePreserveCase()

  expect(mockRpc.invocations).toEqual([['FindWidget.togglePreserveCase']])
})

test('toggleUseRegularExpression', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FindWidget.toggleUseRegularExpression'() {
      return undefined
    },
  })

  await FindWidget.toggleUseRegularExpression()

  expect(mockRpc.invocations).toEqual([['FindWidget.toggleUseRegularExpression']])
})

test('replace', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FindWidget.replace'() {
      return undefined
    },
  })

  await FindWidget.replace()

  expect(mockRpc.invocations).toEqual([['FindWidget.replace']])
})

test('replaceAll', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FindWidget.replaceAll'() {
      return undefined
    },
  })

  await FindWidget.replaceAll()

  expect(mockRpc.invocations).toEqual([['FindWidget.replaceAll']])
})

test('focusElement', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FindWidget.focusElement'() {
      return undefined
    },
  })

  await FindWidget.focusElement(1)

  expect(mockRpc.invocations).toEqual([['FindWidget.focusElement', 1]])
})

test('focusNextElement', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FindWidget.focusNextElement'() {
      return undefined
    },
  })

  await FindWidget.focusNextElement()

  expect(mockRpc.invocations).toEqual([['FindWidget.focusNextElement']])
})

test('focusPreviousElement', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FindWidget.focusPreviousElement'() {
      return undefined
    },
  })

  await FindWidget.focusPreviousElement()

  expect(mockRpc.invocations).toEqual([['FindWidget.focusPreviousElement']])
})
