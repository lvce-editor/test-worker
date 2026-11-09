import { afterEach, expect, jest, test } from '@jest/globals'
import { ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as Wsl from '../src/parts/TestFrameWorkComponentWsl/TestFrameWorkComponentWsl.ts'

afterEach(() => {
  jest.useRealTimers()
})

test('enableExtension enables WSL and refreshes the Activity Bar', async () => {
  using _extension = ExtensionManagementWorker.registerMockRpc({
    'Extensions.enableWorkspace'() {},
  })
  using _renderer = RendererWorker.registerMockRpc({
    'ActivityBar.handleExtensionsChanged'() {},
  })

  await Wsl.enableExtension()

  expect(_extension.invocations).toEqual([['Extensions.enableWorkspace', 'lvce.wsl']])
  expect(_renderer.invocations).toEqual([['ActivityBar.handleExtensionsChanged']])
})

test('connect confirms the command is visible before selecting it', async () => {
  using _renderer = RendererWorker.registerMockRpc({
    'QuickPick.selectItem'() {},
    'QuickPick.setValue'() {},
    'TestFrameWork.checkSingleElementCondition'() {},
    'Viewlet.openWidget'() {},
  })

  await Wsl.connect()

  expect(_renderer.invocations).toEqual([
    ['Viewlet.openWidget', 'QuickPick', 'everything'],
    ['QuickPick.setValue', '>WSL: Connect to WSL'],
    [
      'TestFrameWork.checkSingleElementCondition',
      [
        { selector: '.QuickPickItem', type: 1 },
        { text: 'WSL: Connect to WSL', type: 3 },
      ],
      'toBeVisible',
      {},
    ],
    ['QuickPick.selectItem', 'WSL: Connect to WSL'],
  ])
})
