import type { ParsedCssSelector } from '../ParseCssSelector/ParsedCssSelector.ts'

export interface ILocatorInternal {
  readonly _parsed: ParsedCssSelector
  readonly _selector: string
}
