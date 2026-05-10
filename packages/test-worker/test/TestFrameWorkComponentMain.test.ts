import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Main from '../src/parts/TestFrameWorkComponentMain/TestFrameWorkComponentMain.ts'

const getMockLayoutState = (): Awaited<ReturnType<typeof Main.saveState>> => {
  return {
    layout: {
      activeGroupId: 2,
      direction: 1,
      groups: [
        {
          activeTabId: 1,
          id: 1,
          tabs: [{ id: 1, title: 'left.txt', uri: 'file:///workspace/left.txt' }],
        },
        {
          activeTabId: 2,
          focused: true,
          id: 2,
          tabs: [{ id: 2, title: 'right.txt', uri: 'file:///workspace/right.txt' }],
        },
      ],
    },
  }
}

test('openUri', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri'() {
      return undefined
    },
  })

  await Main.openUri('file:///test.txt')

  expect(mockRpc.invocations).toEqual([['Main.openUri', 'file:///test.txt']])
})

test('saveState', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.saveState'() {
      return { restored: true }
    },
  })

  const result = await Main.saveState(42)

  expect(result).toEqual({ restored: true })
  expect(mockRpc.invocations).toEqual([['Main.saveState', 42]])
})

test('splitRight', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.splitRight'() {
      return undefined
    },
  })

  await Main.splitRight()

  expect(mockRpc.invocations).toEqual([['Main.splitRight']])
})

test('splitDown', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.splitDown'() {
      return undefined
    },
  })

  await Main.splitDown()

  expect(mockRpc.invocations).toEqual([['Main.splitDown']])
})

test('handleClickTogglePreview', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.handleClickTogglePreview'() {
      return undefined
    },
  })

  await Main.handleClickTogglePreview()

  expect(mockRpc.invocations).toEqual([['Main.handleClickTogglePreview']])
})

test('openKeyBindings', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openKeyBindings'() {
      return undefined
    },
  })

  await Main.openKeyBindings()

  expect(mockRpc.invocations).toEqual([['Main.openKeyBindings']])
})

test('handleClickAction', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.handleClickAction'() {
      return undefined
    },
  })

  await Main.handleClickAction('close-all', 'group-1')

  expect(mockRpc.invocations).toEqual([['Main.handleClickAction', 'close-all', 'group-1']])
})

test('closeAllEditors', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.closeAllEditors'() {
      return undefined
    },
  })

  await Main.closeAllEditors()

  expect(mockRpc.invocations).toEqual([['Main.closeAllEditors']])
})

test('closeTabsLeft/Right and others', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.closeActiveEditor'() {
      return undefined
    },
    'Main.closeOthers'() {
      return undefined
    },
    'Main.closeTabsLeft'() {
      return undefined
    },
    'Main.closeTabsRight'() {
      return undefined
    },
    'Main.focusFirst'() {
      return undefined
    },
    'Main.focusLast'() {
      return undefined
    },
    'Main.focusNext'() {
      return undefined
    },
    'Main.focusPrevious'() {
      return undefined
    },
  })

  await Main.closeTabsLeft()
  await Main.closeTabsRight()
  await Main.closeOthers()
  await Main.closeActiveEditor()
  await Main.focusFirst()
  await Main.focusNext()
  await Main.focusPrevious()
  await Main.focusLast()

  expect(mockRpc.invocations).toEqual([
    ['Main.closeTabsLeft'],
    ['Main.closeTabsRight'],
    ['Main.closeOthers'],
    ['Main.closeActiveEditor'],
    ['Main.focusFirst'],
    ['Main.focusNext'],
    ['Main.focusPrevious'],
    ['Main.focusLast'],
  ])
})

test('save', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.save'() {
      return undefined
    },
  })

  await Main.save()

  expect(mockRpc.invocations).toEqual([['Main.save']])
})

test('saveAll', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.saveAll'() {
      return undefined
    },
  })

  await Main.saveAll()

  expect(mockRpc.invocations).toEqual([['Main.saveAll']])
})

test('handleTabContextMenu', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.handleTabContextMenu'() {
      return undefined
    },
  })

  await Main.handleTabContextMenu(0, 100, 200)

  expect(mockRpc.invocations).toEqual([['Main.handleTabContextMenu', 0, 100, 200]])
})

test('handleModifiedStatusChange', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.handleModifiedStatusChange'() {
      return undefined
    },
  })

  await Main.handleModifiedStatusChange('file:///test.txt', true)

  expect(mockRpc.invocations).toEqual([['Main.handleModifiedStatusChange', 'file:///test.txt', true]])
})

test('selectTab', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.selectTab'() {
      return undefined
    },
  })

  await Main.selectTab(0, 1)

  expect(mockRpc.invocations).toEqual([['Main.selectTab', 0, 1]])
})

test('copyPath', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.copyPath'() {
      return undefined
    },
  })

  await Main.copyPath()

  expect(mockRpc.invocations).toEqual([['Main.copyPath']])
})

test('copyRelativePath', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.copyRelativePath'() {
      return undefined
    },
  })

  await Main.copyRelativePath()

  expect(mockRpc.invocations).toEqual([['Main.copyRelativePath']])
})

test('shouldHaveLayout', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.saveState'() {
      return getMockLayoutState()
    },
  })

  await Main.shouldHaveLayout({
    activeGroupIndex: 1,
    direction: 'horizontal',
    groups: [
      {
        tabs: [{ title: 'left.txt' }],
      },
      {
        focused: true,
        tabs: [{ uri: 'file:///workspace/right.txt' }],
      },
    ],
  })

  expect(mockRpc.invocations).toEqual([['Main.saveState', 2]])
})

test('shouldHaveLayout - custom uid', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.saveState'() {
      return getMockLayoutState()
    },
  })

  await Main.shouldHaveLayout(
    {
      direction: 'horizontal',
    },
    7,
  )

  expect(mockRpc.invocations).toEqual([['Main.saveState', 7]])
})

test('shouldHaveLayout - throws when layout does not match', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.saveState'() {
      return getMockLayoutState()
    },
  })

  await expect(
    Main.shouldHaveLayout({
      activeGroupIndex: 0,
      direction: 'vertical',
    }),
  ).rejects.toThrow(
    'expected main layout to match {"activeGroupIndex":0,"direction":"vertical"} but was {"activeGroupId":2,"direction":1,"groups":[{"activeTabId":1,"id":1,"tabs":[{"id":1,"title":"left.txt","uri":"file:///workspace/left.txt"}]},{"activeTabId":2,"focused":true,"id":2,"tabs":[{"id":2,"title":"right.txt","uri":"file:///workspace/right.txt"}]}]}',
  )

  expect(mockRpc.invocations).toEqual([['Main.saveState', 2]])
})

test('handleClickCloseTab', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.handleClickCloseTab'() {
      return undefined
    },
  })

  await Main.handleClickCloseTab('2', '5')

  expect(mockRpc.invocations).toEqual([['Main.handleClickCloseTab', '2', '5']])
})
