import { htmlElements } from '../HtmlElements/HtmlElements.ts'

export const isElement = (selector: string): boolean => {
  return htmlElements.includes(selector)
}
