import type { ILocator } from '../ILocator/ILocator.ts'
import type { ILocatorCreateOptions } from '../ILocatorCreateOptions/ILocatorCreateOptions.ts'
import type { ParsedCssSelector } from '../ParseCssSelector/ParseCssSelector.ts'
import { parseCssSelector } from '../ParseCssSelector/ParseCssSelector.ts'
import { performAction } from '../PerformAction/PerformAction.ts'
import * as Assert from '../TestAssert/TestAssert.ts'
import * as ToButtonNumber from '../ToButtonNumber/ToButtonNumber.ts'

export class Locator implements ILocator {
  readonly _selector: string
  readonly _parsed: ParsedCssSelector

  constructor(selector: string, options: ILocatorCreateOptions = {}, parsed?: ParsedCssSelector) {
    if (!options || typeof options !== 'object' || Array.isArray(options)) {
      throw new TypeError('options must be of type object')
    }
    const { hasText = '', nth = -1 } = options
    Assert.string(hasText, 'options.hasText must be of type string')
    Assert.number(nth, 'options.nth must be of type number')
    this._selector = selector
    this._parsed = parsed || applyLocatorOptions(parseCssSelector(selector), options)
  }

  async click({ button = 'left' }: { readonly button?: string } = {}): Promise<void> {
    const options = {
      bubbles: true,
      button: ToButtonNumber.toButtonNumber(button),
      cancable: true,
      detail: 1,
    }
    return performAction(this, 'click', options)
  }

  async hover(): Promise<void> {
    const options = {
      bubbles: true,
      cancable: true,
    }
    return performAction(this, 'hover', options)
  }

  first(): any {
    return new Locator(this._selector, {}, withNth(this._parsed, 0))
  }

  locator(subSelector: string): any {
    const selector = `${this._selector} ${subSelector}`
    return new Locator(selector, {}, [...this._parsed, ...parseCssSelector(subSelector)])
  }

  nth(nth: number): any {
    Assert.number(nth, 'nth must be of type number')
    return new Locator(this._selector, {}, withNth(this._parsed, nth))
  }

  async type(text: string): Promise<void> {
    const options = { text }
    return performAction(this, 'type', options)
  }

  async dispatchEvent(type: string, init: any): Promise<void> {
    return performAction(this, 'dispatchEvent', { init, type })
  }
}

const applyLocatorOptions = (parsed: ParsedCssSelector, { hasText = '', nth = -1 }: ILocatorCreateOptions): ParsedCssSelector => {
  let nextParsed = parsed
  if (hasText) {
    nextParsed = [...nextParsed, { text: hasText, type: 'has-text' }]
  }
  if (nth !== -1) {
    nextParsed = withNth(nextParsed, nth)
  }
  return nextParsed
}

const withNth = (parsed: ParsedCssSelector, nth: number): ParsedCssSelector => {
  const filtered = parsed.filter((part) => part.type !== 'nth')
  return [...filtered, { index: nth, type: 'nth' }]
}
