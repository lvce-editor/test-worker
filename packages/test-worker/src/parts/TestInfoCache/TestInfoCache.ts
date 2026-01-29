import type { TestInfoItem } from './TestInfoItem.ts'

export type { TestInfoItem } from './TestInfoItem.ts'

export interface ITestInfoCache {
  readonly clear: () => void
  readonly hasItems: () => boolean
  readonly last: () => TestInfoItem
  readonly push: (item: TestInfoItem) => void
}

let items: readonly TestInfoItem[] = []

export const hasItems = (): boolean => {
  return items.length > 0
}

export const push = (item: TestInfoItem): void => {
  items = [...items, item]
}

export const last = (): TestInfoItem => {
  const item = items.at(-1)
  if (!item) {
    throw new Error(`no item found`)
  }
  return item
}

export const clear = (): void => {
  items = []
}
