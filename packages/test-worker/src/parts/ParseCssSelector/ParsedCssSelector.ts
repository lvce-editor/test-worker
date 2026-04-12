export interface ParsedCssSelectorPart {
  readonly selector: string
  readonly type: 'css'
}

export interface ParsedTextSelectorPart {
  readonly text: string
  readonly type: 'text'
}

export interface ParsedHasTextSelectorPart {
  readonly text: string
  readonly type: 'has-text'
}

export interface ParsedNthSelectorPart {
  readonly index: number
  readonly type: 'nth'
}

export type ParsedSelectorPart = ParsedCssSelectorPart | ParsedTextSelectorPart | ParsedHasTextSelectorPart | ParsedNthSelectorPart

export type ParsedCssSelector = readonly ParsedSelectorPart[]
