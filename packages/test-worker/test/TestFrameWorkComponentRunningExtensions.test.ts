import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as RunningExtensions from '../src/parts/TestFrameWorkComponentRunningExtensions/TestFrameWorkComponentRunningExtensions.ts'

test('commands', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri'() {},
    'RunningExtensions.copyId'() {},
    'RunningExtensions.disable'() {},
    'RunningExtensions.disableWorkspace'() {},
    'RunningExtensions.handleContextMenu'() {},
    'RunningExtensions.reportIssue'() {},
    'RunningExtensions.startProfile'() {},
  })

  await RunningExtensions.show()
  await RunningExtensions.handleContextMenu(1, 10, 20)
  await RunningExtensions.handleContextMenu(2)
  await RunningExtensions.copyId(3)
  await RunningExtensions.disable(4)
  await RunningExtensions.disableWorkspace(5)
  await RunningExtensions.reportIssue(6)
  await RunningExtensions.startProfile()

  expect(mockRpc.invocations).toEqual([
    ['Main.openUri', 'running-extensions:///1'],
    ['RunningExtensions.handleContextMenu', 1, 10, 20],
    ['RunningExtensions.handleContextMenu', 2, 0, 0],
    ['RunningExtensions.copyId', 3],
    ['RunningExtensions.disable', 4],
    ['RunningExtensions.disableWorkspace', 5],
    ['RunningExtensions.reportIssue', 6],
    ['RunningExtensions.startProfile'],
  ])
})
