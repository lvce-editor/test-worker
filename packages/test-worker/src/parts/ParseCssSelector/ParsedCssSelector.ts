interface ParsedCssSelectorPart {
  readonly selector: string
  readonly type: 'css'
}

interface ParsedTextSelectorPart {
  readonly text: string
  readonly type: 'text'
}

interface ParsedHasTextSelectorPart {
  readonly text: string
  readonly type: 'has-text'
}

interface ParsedNthSelectorPart {
  readonly index: number
  readonly type: 'nth'
}

type ParsedSelectorPart = ParsedCssSelectorPart | ParsedTextSelectorPart | ParsedHasTextSelectorPart | ParsedNthSelectorPart

export type ParsedCssSelector = readonly ParsedSelectorPart[]
