import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as About from '../src/parts/TestFrameWorkComponentAbout/TestFrameWorkComponentAbout.ts'

test('show', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'About.showAbout'() {
      return undefined
    },
  })

  await About.show()
  expect(mockRpc.invocations).toEqual([['About.showAbout']])
})

test('handleClickOk', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'About.handleClickOk'() {
      return undefined
    },
  })

  await About.handleClickOk()
  expect(mockRpc.invocations).toEqual([['About.handleClickOk']])
})

test('handleClickClose', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'About.handleClickClose'() {
      return undefined
    },
  })

  await About.handleClickClose()
  expect(mockRpc.invocations).toEqual([['About.handleClickClose']])
})

test('handleClickCopy', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'About.handleClickCopy'() {
      return undefined
    },
  })

  await About.handleClickCopy()
  expect(mockRpc.invocations).toEqual([['About.handleClickCopy']])
})

test('focusNext', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'About.focusNext'() {
      return undefined
    },
  })

  await About.focusNext()
  expect(mockRpc.invocations).toEqual([['About.focusNext']])
})

test('focusPrevious', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'About.focusPrevious'() {
      return undefined
    },
  })

  await About.focusPrevious()
  expect(mockRpc.invocations).toEqual([['About.focusPrevious']])
})
