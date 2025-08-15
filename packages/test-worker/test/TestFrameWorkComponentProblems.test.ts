import { test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.js'
import * as Problems from '../src/parts/TestFrameWorkComponentProblems/TestFrameWorkComponentProblems.ts'

test('show', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Panel.selectIndex') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  await Problems.show()
})

test('handleFilterInput', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, text?: string) => {
      if (method === 'Problems.handleFilterInput') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  await Problems.handleFilterInput('test filter')
})

test('copyMessage', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Problems.copyMessage') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  await Problems.copyMessage()
})

test('focusIndex', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, index?: number) => {
      if (method === 'Problems.focusIndex') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  await Problems.focusIndex(5)
})

test('handleArrowLeft', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Problems.handleArrowLeft') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  await Problems.handleArrowLeft()
})

test('handleArrowRight', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Problems.handleArrowRight') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  await Problems.handleArrowRight()
})

test('handleClickAt', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, x?: number, y?: number) => {
      if (method === 'Problems.handleClickAt') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  await Problems.handleClickAt(100, 200)
})

test('handleIconThemeChange', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Problems.handleIconThemeChange') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  await Problems.handleIconThemeChange()
})

test('viewAsList', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Problems.viewAsList') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  await Problems.viewAsList()
})

test('viewAsTable', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Problems.viewAsTable') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  await Problems.viewAsTable()
})
