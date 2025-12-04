import { test, expect } from '@jest/globals'
import * as ElementActions from '../src/parts/ElementActions/ElementActions.ts'

test('mouseEvent', () => {
  expect(ElementActions.mouseEvent('mousedown', { button: 0 })).toEqual({
    constructor: 'MouseEvent',
    eventType: 'mousedown',
    options: { button: 0 },
    type: 'dispatch',
  })
})

test('mouseDown', () => {
  expect(ElementActions.mouseDown({ button: 0 })).toEqual([
    {
      constructor: 'MouseEvent',
      eventType: 'mousedown',
      options: { button: 0 },
      type: 'dispatch',
    },
  ])
})

test('mouseUp', () => {
  expect(ElementActions.mouseUp({ button: 0 })).toEqual([
    {
      constructor: 'MouseEvent',
      eventType: 'mouseup',
      options: { button: 0 },
      type: 'dispatch',
    },
  ])
})

test('click - left button', () => {
  expect(ElementActions.click({ button: 0 })).toEqual([
    {
      constructor: 'MouseEvent',
      eventType: 'mousedown',
      options: { button: 0 },
      type: 'dispatch',
    },
    {
      constructor: 'MouseEvent',
      eventType: 'click',
      options: { button: 0 },
      type: 'dispatch',
    },
    {
      constructor: 'MouseEvent',
      eventType: 'mouseup',
      options: { button: 0 },
      type: 'dispatch',
    },
  ])
})

test('click - right button', () => {
  expect(ElementActions.click({ button: 2 })).toEqual([
    {
      constructor: 'MouseEvent',
      eventType: 'mousedown',
      options: { button: 2 },
      type: 'dispatch',
    },
    {
      constructor: 'MouseEvent',
      eventType: 'click',
      options: { button: 2 },
      type: 'dispatch',
    },
    {
      constructor: 'MouseEvent',
      eventType: 'mouseup',
      options: { button: 2 },
      type: 'dispatch',
    },
    {
      constructor: 'MouseEvent',
      eventType: 'contextmenu',
      options: { button: 2 },
      type: 'dispatch',
    },
  ])
})

test('hover', () => {
  expect(ElementActions.hover({})).toEqual([
    {
      constructor: 'MouseEvent',
      eventType: 'mouseenter',
      options: {},
      type: 'dispatch',
    },
  ])
})

test('type', () => {
  expect(ElementActions.type({ text: 'abc' })).toEqual([
    {
      constructor: '',
      eventType: '',
      options: { text: 'abc' },
      type: 'type',
    },
  ])
})

test('keyboardEvent', () => {
  expect(ElementActions.keyboardEvent('keydown', { key: 'a' })).toEqual({
    constructor: 'MouseEvent',
    eventType: 'keydown',
    options: { key: 'a' },
    type: 'dispatch',
  })
})

test('keyDown', () => {
  expect(ElementActions.keyDown({ key: 'a' })).toEqual([
    {
      constructor: 'MouseEvent',
      eventType: 'keydown',
      options: { key: 'a' },
      type: 'dispatch',
    },
  ])
})

test('keyUp', () => {
  expect(ElementActions.keyUp({ key: 'a' })).toEqual([
    {
      constructor: 'MouseEvent',
      eventType: 'keyup',
      options: { key: 'a' },
      type: 'dispatch',
    },
  ])
})
