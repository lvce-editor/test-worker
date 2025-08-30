import { beforeEach, expect, jest, test } from '@jest/globals'
import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as SettingsView from '../src/parts/TestFrameWorkComponentSettingsView/TestFrameWorkComponentSettingsView.ts'

const mockInvoke = jest.fn()

const mockRpc = {
  invoke: mockInvoke,
} as any

beforeEach(() => {
  ParentRpc.set(mockRpc)
  mockInvoke.mockReset()
})

test('show', async () => {
  await SettingsView.show()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Main.openUri', 'settings://')
})

test('handleInput', async () => {
  await SettingsView.handleInput('search text')
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Settings.handleInput', 'search text', InputSource.Script)
})

test('usePreviousSearchValue', async () => {
  await SettingsView.usePreviousSearchValue()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Settings.usePreviousSearchValue')
})

test('useNextSearchValue', async () => {
  await SettingsView.useNextSearchValue()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Settings.useNextSearchValue')
})

test('clear', async () => {
  await SettingsView.clear('query')
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Settings.clear', 'query', InputSource.Script)
})

test('selectWorkspace', async () => {
  await SettingsView.selectWorkspace()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Settings.handleClickTab', 'workspace')
})

test('selectTextEditor', async () => {
  await SettingsView.selectTextEditor()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Settings.handleClickTab', 'text-editor')
})

test('selectExtensions', async () => {
  await SettingsView.selectExtensions()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Settings.handleClickTab', 'extensions')
})

test('handleScroll', async () => {
  await SettingsView.handleScroll(250)
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Settings.handleScroll', 250, InputSource.Script)
})
