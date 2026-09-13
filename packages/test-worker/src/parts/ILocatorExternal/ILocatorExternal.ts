interface LocatorClickOptions {
  readonly button?: string
}

export interface ILocatorExternal {
  /**
   * @deprecated Use commands instead to avoid race conditions.
   */
  readonly click: (options?: LocatorClickOptions) => Promise<void>
  /**
   * @deprecated Use commands instead to avoid race conditions.
   */
  readonly dispatchEvent: (type: string, init: string) => Promise<void>
  readonly first: () => ILocatorExternal
  /**
   * @deprecated Use commands instead to avoid race conditions.
   */
  readonly hover: () => Promise<void>
  readonly locator: (subSelector: string) => ILocatorExternal
  readonly nth: (nth: number) => ILocatorExternal
  /**
   * @deprecated Use commands instead to avoid race conditions.
   */
  readonly type: (text: string) => Promise<void>
}
