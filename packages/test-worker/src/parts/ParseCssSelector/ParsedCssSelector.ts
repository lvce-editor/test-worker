// Wire tags shared with renderer-process: CSS=1, Text=2, HasText=3, Nth=4.
interface ParsedCssSelectorPart {
  readonly selector: string
  readonly type: 1
}

interface ParsedTextSelectorPart {
  readonly text: string
  readonly type: 2
}

interface ParsedHasTextSelectorPart {
  readonly text: string
  readonly type: 3
}

interface ParsedNthSelectorPart {
  readonly index: number
  readonly type: 4
}

type ParsedSelectorPart = ParsedCssSelectorPart | ParsedTextSelectorPart | ParsedHasTextSelectorPart | ParsedNthSelectorPart

export type ParsedCssSelector = readonly ParsedSelectorPart[]
