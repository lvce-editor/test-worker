import type { ParsedCssSelector } from '../ParseCssSelector/ParseCssSelector.ts'

export interface ILocatorInternal {
  readonly _parsed: ParsedCssSelector
}
