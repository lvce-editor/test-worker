import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as RunningExtensions from '../src/parts/TestFrameWorkComponentRunningExtensions/TestFrameWorkComponentRunningExtensions.ts'

const getSelector = (locator: any): string => {
  return locator._selector
}

const getParsed = (locator: any): readonly any[] => {
  return locator._parsed
}

test('commands', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri'() {},
    'RunningExtensions.copyId'() {},
    'RunningExtensions.disable'() {},
    'RunningExtensions.disableWorkspace'() {},
    'RunningExtensions.handleContextMenu'() {},
    'RunningExtensions.reportIssue'() {},
    'RunningExtensions.setExtensions'() {},
    'RunningExtensions.startProfile'() {},
  })

  const extensions: readonly RunningExtensions.RunningExtension[] = [
    {
      activationEvent: 'onStartupFinished',
      activationTime: 12.49,
      icon: '',
      id: 'sample.extension',
      name: 'Sample Extension',
      version: '1.0.0',
    },
  ]

  await RunningExtensions.show()
  await RunningExtensions.setExtensions(extensions)
  await RunningExtensions.handleContextMenu(1, 10, 20)
  await RunningExtensions.handleContextMenu(2)
  await RunningExtensions.copyId(3)
  await RunningExtensions.disable(4)
  await RunningExtensions.disableWorkspace(5)
  await RunningExtensions.reportIssue(6)
  await RunningExtensions.startProfile()

  expect(mockRpc.invocations).toEqual([
    ['Main.openUri', 'running-extensions:///1'],
    ['RunningExtensions.setExtensions', extensions],
    ['RunningExtensions.handleContextMenu', 1, 10, 20],
    ['RunningExtensions.handleContextMenu', 2, 0, 0],
    ['RunningExtensions.copyId', 3],
    ['RunningExtensions.disable', 4],
    ['RunningExtensions.disableWorkspace', 5],
    ['RunningExtensions.reportIssue', 6],
    ['RunningExtensions.startProfile'],
  ])
})

test('locator helpers use running extensions selectors', () => {
  expect(getSelector(RunningExtensions.root())).toBe('.RunningExtensions')
  expect(getSelector(RunningExtensions.rows())).toBe('.RunningExtension')
  expect(getSelector(RunningExtensions.row(2))).toBe('.RunningExtension')
  expect(getSelector(RunningExtensions.selectedRow(2))).toBe('.RunningExtension.ExtensionActive[data-index="2"]')
  expect(getSelector(RunningExtensions.emptyMessage())).toBe('.RunningExtensionsEmpty')
  expect(getSelector(RunningExtensions.name(2))).toBe('.RunningExtension .RunningExtensionName')
  expect(getSelector(RunningExtensions.version(2))).toBe('.RunningExtension .RunningExtensionVersion')
  expect(getSelector(RunningExtensions.id(2))).toBe('.RunningExtension .RunningExtensionId')
  expect(getSelector(RunningExtensions.activationTime(2))).toBe('.RunningExtension .RunningExtensionActivationTime')
  expect(getSelector(RunningExtensions.activationReason(2))).toBe('.RunningExtension .RunningExtensionActivationReason')
  expect(getSelector(RunningExtensions.remoteAuthority(2))).toBe('.RunningExtension .RunningExtensionRemoteAuthority')
  expect(getSelector(RunningExtensions.icon(2))).toBe('.RunningExtension .RunningExtensionIcon')
  expect(getSelector(RunningExtensions.defaultIcon(2))).toBe('.RunningExtension .RunningExtensionDefaultIcon')
})

test('indexed locator helpers keep nth selectors stable', () => {
  for (const locator of [
    RunningExtensions.row(2),
    RunningExtensions.name(2),
    RunningExtensions.version(2),
    RunningExtensions.id(2),
    RunningExtensions.activationTime(2),
    RunningExtensions.activationReason(2),
    RunningExtensions.remoteAuthority(2),
    RunningExtensions.icon(2),
    RunningExtensions.defaultIcon(2),
  ]) {
    expect(getParsed(locator)).toContainEqual({
      index: 2,
      type: 'nth',
    })
  }
})

test('select clicks the requested row', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.performAction'() {},
  })

  await RunningExtensions.select(2)

  expect(mockRpc.invocations).toHaveLength(1)
  const [[command, locator, action, options]] = mockRpc.invocations
  expect(command).toBe('TestFrameWork.performAction')
  expect(getSelector(locator)).toBe('.RunningExtension')
  expect(getParsed(locator)).toContainEqual({
    index: 2,
    type: 'nth',
  })
  expect(action).toBe('click')
  expect(options).toEqual({
    bubbles: true,
    button: 0,
    cancable: true,
    detail: 1,
  })
})
