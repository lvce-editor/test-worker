import type { TestInfoItem } from './TestInfoItem.ts'

export type { TestInfoItem } from './TestInfoItem.ts'

export interface ITestInfoCache {
  readonly clear: () => void
  readonly hasItems: () => boolean
  readonly last: () => TestInfoItem
  readonly push: (item: TestInfoItem) => void
}

const state: { items: readonly TestInfoItem[] } = {
  items: [],
}

export const hasItems = (): boolean => {
  return state.items.length > 0
}

export const push = (item: TestInfoItem): void => {
  state.items = [...state.items, item]
}

export const last = (): TestInfoItem => {
  const item = state.items.at(-1)
  if (!item) {
    throw new Error(`no item found`)
  }
  return item
}

export const maybeLast = (): TestInfoItem | undefined => {
  return state.items.at(-1)
}

export const clear = (): void => {
  state.items = []
}
