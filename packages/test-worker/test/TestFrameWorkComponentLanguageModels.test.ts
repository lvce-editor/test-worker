import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as LanguageModels from '../src/parts/TestFrameWorkComponentLanguageModels/TestFrameWorkComponentLanguageModels.ts'

test('open', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri'() {
      return undefined
    },
  })

  await LanguageModels.open()

  expect(mockRpc.invocations).toEqual([['Main.openUri', 'language-models:///1']])
})

test('handleFilterInput', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'LanguageModels.handleFilterInput'() {
      return undefined
    },
  })

  await LanguageModels.handleFilterInput('test')

  expect(mockRpc.invocations).toEqual([['LanguageModels.handleFilterInput', 'test']])
})

test('clearFilterInput', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'LanguageModels.clearFilterInput'() {
      return undefined
    },
  })

  await LanguageModels.clearFilterInput()

  expect(mockRpc.invocations).toEqual([['LanguageModels.clearFilterInput']])
})

test('addModel', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'LanguageModels.addModel'() {
      return undefined
    },
  })

  await LanguageModels.addModel()

  expect(mockRpc.invocations).toEqual([['LanguageModels.addModel']])
})

test('removeModel', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'LanguageModels.removeModel'() {
      return undefined
    },
  })

  await LanguageModels.removeModel('1')

  expect(mockRpc.invocations).toEqual([['LanguageModels.removeModel', '1']])
})
