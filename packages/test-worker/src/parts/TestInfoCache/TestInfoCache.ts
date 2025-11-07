export interface TestInfoItem {
  readonly url: string
  readonly platform: number
  readonly assetDir: string
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
