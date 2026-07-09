import { RendererWorker } from '@lvce-editor/rpc-registry'
import { AssertionError } from '../AssertionError/AssertionError.ts'

const defaultMainAreaUid = 2

const directionMap = {
  horizontal: 1,
  vertical: 2,
} as const

const isLayoutDirectionName = (value: string): value is keyof typeof directionMap => {
  return value === 'horizontal' || value === 'vertical'
}

type LayoutDirection = 'horizontal' | 'vertical' | number

type LayoutExpectationValue = string | number | boolean | RegExp | null | readonly LayoutExpectationValue[] | LayoutExpectationObject

type LayoutExpectationObject = {
  readonly [key: string]: LayoutExpectationValue | undefined
}

export interface LayoutExpectation extends LayoutExpectationObject {
  readonly activeGroupIndex?: number
  readonly direction?: LayoutDirection
  readonly groups?: readonly LayoutExpectationObject[]
}

type LayoutGroupState = {
  readonly id?: number | string
  readonly [key: string]: unknown
}

type LayoutState = {
  readonly activeGroupId?: number | string
  readonly groups?: readonly LayoutGroupState[]
  readonly [key: string]: unknown
}

type SavedState = {
  readonly layout?: LayoutState
}

type EditorInput =
  | {
      readonly type: 'editor'
      readonly uri: string
    }
  | {
      readonly type: 'image'
      readonly uri: string
    }
  | {
      readonly type: 'video'
      readonly uri: string
    }
  | {
      readonly type: 'diff-editor'
      readonly uriLeft: string
      readonly uriRight: string
    }
  | {
      readonly extensionId: string
      readonly type: 'extension-detail-view'
    }

export interface OpenInputOptions {
  readonly editorInput: EditorInput
  readonly focu: boolean
  readonly preview?: boolean
}

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof RegExp)
}

const matchesExpectedArray = (actual: unknown, expected: readonly LayoutExpectationValue[]): boolean => {
  if (!Array.isArray(actual) || actual.length !== expected.length) {
    return false
  }
  for (let i = 0; i < expected.length; i++) {
    if (!matchesExpected(actual[i], expected[i])) {
      return false
    }
  }
  return true
}

const matchesExpectedObject = (actual: unknown, expected: LayoutExpectationObject): boolean => {
  if (!isObject(actual)) {
    return false
  }
  for (const [childKey, childExpectedValue] of Object.entries(expected)) {
    if (childExpectedValue === undefined) {
      continue
    }
    if (!matchesExpected(actual[childKey], childExpectedValue, childKey)) {
      return false
    }
  }
  return true
}

const matchesExpected = (actual: unknown, expected: LayoutExpectationValue, key = ''): boolean => {
  if (key === 'direction' && typeof expected === 'string' && isLayoutDirectionName(expected)) {
    if (expected === 'horizontal') {
      return Object.is(actual, directionMap.horizontal)
    }
    return Object.is(actual, directionMap.vertical)
  }
  if (expected instanceof RegExp) {
    return typeof actual === 'string' && expected.test(actual)
  }
  if (Array.isArray(expected)) {
    return matchesExpectedArray(actual, expected)
  }
  if (isObject(expected)) {
    return matchesExpectedObject(actual, expected)
  }
  return Object.is(actual, expected)
}

const matchesActiveGroupIndex = (layout: LayoutState, activeGroupIndex: number): boolean => {
  const groups = layout.groups || []
  const group = groups[activeGroupIndex]
  if (!group) {
    return false
  }
  return layout.activeGroupId === group.id
}

const serializeForError = (value: unknown): string => {
  return JSON.stringify(value, (_key, currentValue) => {
    if (currentValue instanceof RegExp) {
      return currentValue.toString()
    }
    return currentValue
  })
}

export const openUri = async (uri: string): Promise<void> => {
  await RendererWorker.invoke('Main.openUri', uri)
}

export const openInput = async (options: OpenInputOptions): Promise<void> => {
  await RendererWorker.invoke('Main.openInput', options)
}

export const saveState = async (uid: number): Promise<SavedState> => {
  return RendererWorker.invoke('Main.saveState', uid)
}

export const shouldHaveLayout = async (expectedLayout: LayoutExpectation, uid = defaultMainAreaUid): Promise<void> => {
  const state = await saveState(uid)
  const actualLayout = state.layout
  if (!actualLayout) {
    throw new AssertionError(`expected main layout to exist but state was ${serializeForError(state)}`)
  }
  const { activeGroupIndex, ...partialExpectedLayout } = expectedLayout
  const matchesLayout = matchesExpected(actualLayout, partialExpectedLayout)
  const matchesActiveGroup = activeGroupIndex === undefined || matchesActiveGroupIndex(actualLayout, activeGroupIndex)
  if (!matchesLayout || !matchesActiveGroup) {
    throw new AssertionError(`expected main layout to match ${serializeForError(expectedLayout)} but was ${serializeForError(actualLayout)}`)
  }
}

export const splitRight = async (): Promise<void> => {
  await RendererWorker.invoke('Main.splitRight')
}

export const splitDown = async (): Promise<void> => {
  await RendererWorker.invoke('Main.splitDown')
}

export const openKeyBindings = async (): Promise<void> => {
  await RendererWorker.invoke('Main.openKeyBindings')
}

export const handleClickTogglePreview = async (): Promise<void> => {
  await RendererWorker.invoke('Main.handleClickTogglePreview')
}

export const handleClickAction = async (action: string, rawGroupId: string): Promise<void> => {
  await RendererWorker.invoke('Main.handleClickAction', action, rawGroupId)
}

export const closeAllEditors = async (): Promise<void> => {
  await RendererWorker.invoke('Main.closeAllEditors')
}

export const closeTabsLeft = async (): Promise<void> => {
  await RendererWorker.invoke('Main.closeTabsLeft')
}

export const handleModifiedStatusChange = async (uri: string, newStatus: boolean): Promise<void> => {
  await RendererWorker.invoke('Main.handleModifiedStatusChange', uri, newStatus)
}

export const closeTabsRight = async (): Promise<void> => {
  await RendererWorker.invoke('Main.closeTabsRight')
}

export const selectTab = async (groupIndex: number, tabIndex: number): Promise<void> => {
  await RendererWorker.invoke('Main.selectTab', groupIndex, tabIndex)
}

export const closeOthers = async (): Promise<void> => {
  await RendererWorker.invoke('Main.closeOthers')
}

export const closeActiveEditor = async (): Promise<void> => {
  await RendererWorker.invoke('Main.closeActiveEditor')
}

export const save = async (): Promise<void> => {
  await RendererWorker.invoke('Main.save')
}

export const saveAll = async (): Promise<void> => {
  await RendererWorker.invoke('Main.saveAll')
}

export const focusFirst = async (): Promise<void> => {
  await RendererWorker.invoke('Main.focusFirst')
}

export const focusNext = async (): Promise<void> => {
  await RendererWorker.invoke('Main.focusNext')
}

export const focusPrevious = async (): Promise<void> => {
  await RendererWorker.invoke('Main.focusPrevious')
}

export const handleClickCloseTab = async (rawGroupIndex: string, rawIndex: string): Promise<void> => {
  await RendererWorker.invoke('Main.handleClickCloseTab', rawGroupIndex, rawIndex)
}

export const focusLast = async (): Promise<void> => {
  await RendererWorker.invoke('Main.focusLast')
}

export const handleTabContextMenu = async (button: number, x: number, y: number): Promise<void> => {
  await RendererWorker.invoke('Main.handleTabContextMenu', button, x, y)
}

export const copyPath = async (): Promise<void> => {
  await RendererWorker.invoke('Main.copyPath')
}

export const copyRelativePath = async (): Promise<void> => {
  await RendererWorker.invoke('Main.copyRelativePath')
}
