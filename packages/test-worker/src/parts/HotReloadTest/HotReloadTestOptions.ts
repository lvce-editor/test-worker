import type * as TestInfoCache from '../TestInfoCache/TestInfoCache.ts'

export interface HotReloadTestOptions {
  readonly clearConsole: () => void
  readonly getLastTestInfoItem: () => TestInfoCache.TestInfoItem
  readonly hastTestInfoItems: () => boolean
  readonly locationHref: string
  readonly time: number
}
