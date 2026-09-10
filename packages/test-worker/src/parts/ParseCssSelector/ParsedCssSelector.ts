import type * as SelectorType from '../SelectorType/SelectorType.ts'

interface ParsedCssSelectorPart {
  readonly selector: string
  readonly type: typeof SelectorType.Css
}

interface ParsedTextSelectorPart {
  readonly text: string
  readonly type: typeof SelectorType.Text
}

interface ParsedHasTextSelectorPart {
  readonly text: string
  readonly type: typeof SelectorType.HasText
}

interface ParsedNthSelectorPart {
  readonly index: number
  readonly type: typeof SelectorType.Nth
}

type ParsedSelectorPart = ParsedCssSelectorPart | ParsedTextSelectorPart | ParsedHasTextSelectorPart | ParsedNthSelectorPart

export type ParsedCssSelector = readonly ParsedSelectorPart[]
