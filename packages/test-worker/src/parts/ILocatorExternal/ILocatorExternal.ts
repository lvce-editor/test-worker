export interface ILocatorExternal {
  readonly click: (options: { readonly button?: string }) => Promise<void>
  readonly hover: () => Promise<void>
  readonly first: () => ILocatorExternal
  readonly locator: (subSelector: string) => ILocatorExternal
  readonly nth: (nth: number) => ILocatorExternal
  readonly type: (text: string) => Promise<void>
  readonly dispatchEvent: (type: string, init: string) => Promise<void>
}
