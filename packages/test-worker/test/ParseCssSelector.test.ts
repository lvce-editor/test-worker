import { expect, test } from '@jest/globals'
import { parseCssSelector } from '../src/parts/ParseCssSelector/ParseCssSelector.ts'

test('parseCssSelector: parses text selector', () => {
  expect(parseCssSelector('text=Save')).toEqual({
    text: 'Save',
    type: 'text',
  })
})

test('parseCssSelector: parses css selector by class', () => {
  expect(parseCssSelector('.button')).toEqual({
    selector: '.button',
    type: 'css',
  })
})

test('parseCssSelector: parses css selector by html element', () => {
  expect(parseCssSelector('button')).toEqual({
    selector: 'button',
    type: 'css',
  })
})

test('parseCssSelector: parses chained css selector', () => {
  expect(parseCssSelector('button:nth-of-type(3) span')).toEqual({
    selector: 'button:nth-of-type(3) span',
    type: 'css',
  })
})

test('parseCssSelector: parses attribute selector', () => {
  expect(parseCssSelector('[aria-label="Save"]')).toEqual({
    selector: '[aria-label="Save"]',
    type: 'css',
  })
})

test('parseCssSelector: parses pseudo selector', () => {
  expect(parseCssSelector(':root')).toEqual({
    selector: ':root',
    type: 'css',
  })
})

test('parseCssSelector: parses css selector with text filter', () => {
  expect(parseCssSelector('.button text=Save')).toEqual({
    selector: '.button',
    text: 'Save',
    type: 'css+text',
  })
})

test('parseCssSelector: throws for non-string selector', () => {
  expect(() => parseCssSelector(42 as any)).toThrow(new TypeError('selector must be of type string'))
})

test('parseCssSelector: throws for unsupported selector', () => {
  expect(() => parseCssSelector('buttonish')).toThrow(new Error('unsupported selector: buttonish'))
})

test('parseCssSelector: throws for unsupported css selector before text filter', () => {
  expect(() => parseCssSelector('123 text=Save')).toThrow(new Error('unsupported selector: 123 text=Save'))
})

test('parseCssSelector: throws for empty selector', () => {
  expect(() => parseCssSelector('')).toThrow(new Error('unsupported selector: '))
})
