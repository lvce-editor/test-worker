import type { ParsedCssSelector } from '../ParseCssSelector/ParseCssSelector.ts'

export interface ILocatorInternal {
  readonly _hasText: string
  readonly _nth: number
  readonly _parsed: ParsedCssSelector
  readonly _selector: string
}
