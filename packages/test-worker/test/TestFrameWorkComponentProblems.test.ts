import { test, jest, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.js'
import * as Problems from '../src/parts/TestFrameWorkComponentProblems/TestFrameWorkComponentProblems.ts'

test('show', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Problems.show()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Panel.selectIndex', 0)
})

test('handleFilterInput', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Problems.handleFilterInput('test filter')

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Problems.handleFilterInput', 'test filter')
})

test('copyMessage', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Problems.copyMessage()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Problems.copyMessage')
})

test('focusIndex', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Problems.focusIndex(5)

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Problems.focusIndex', 5)
})

test('handleArrowLeft', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Problems.handleArrowLeft()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Problems.handleArrowLeft')
})

test('handleArrowRight', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Problems.handleArrowRight()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Problems.handleArrowRight')
})

test('handleClickAt', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Problems.handleClickAt(100, 200)

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Problems.handleClickAt', 100, 200)
})

test('handleIconThemeChange', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Problems.handleIconThemeChange()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Problems.handleIconThemeChange')
})

test('viewAsList', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Problems.viewAsList()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Problems.viewAsList')
})

test('viewAsTable', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Problems.viewAsTable()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Problems.viewAsTable')
})
