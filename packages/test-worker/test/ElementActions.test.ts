import { test, expect } from '@jest/globals'
import * as ElementActions from '../src/parts/ElementActions/ElementActions.ts'

test('mouseEvent', () => {
  expect(ElementActions.mouseEvent('mousedown', { button: 0 })).toEqual({
    type: 'dispatch',
    constructor: 'MouseEvent',
    eventType: 'mousedown',
    options: { button: 0 },
  })
})

test('mouseDown', () => {
  expect(ElementActions.mouseDown({ button: 0 })).toEqual([
    {
      type: 'dispatch',
      constructor: 'MouseEvent',
      eventType: 'mousedown',
      options: { button: 0 },
    },
  ])
})

test('mouseUp', () => {
  expect(ElementActions.mouseUp({ button: 0 })).toEqual([
    {
      type: 'dispatch',
      constructor: 'MouseEvent',
      eventType: 'mouseup',
      options: { button: 0 },
    },
  ])
})

test('click - left button', () => {
  expect(ElementActions.click({ button: 0 })).toEqual([
    {
      type: 'dispatch',
      constructor: 'MouseEvent',
      eventType: 'mousedown',
      options: { button: 0 },
    },
    {
      type: 'dispatch',
      constructor: 'MouseEvent',
      eventType: 'click',
      options: { button: 0 },
    },
    {
      type: 'dispatch',
      constructor: 'MouseEvent',
      eventType: 'mouseup',
      options: { button: 0 },
    },
  ])
})

test('click - right button', () => {
  expect(ElementActions.click({ button: 2 })).toEqual([
    {
      type: 'dispatch',
      constructor: 'MouseEvent',
      eventType: 'mousedown',
      options: { button: 2 },
    },
    {
      type: 'dispatch',
      constructor: 'MouseEvent',
      eventType: 'click',
      options: { button: 2 },
    },
    {
      type: 'dispatch',
      constructor: 'MouseEvent',
      eventType: 'mouseup',
      options: { button: 2 },
    },
    {
      type: 'dispatch',
      constructor: 'MouseEvent',
      eventType: 'contextmenu',
      options: { button: 2 },
    },
  ])
})

test('hover', () => {
  expect(ElementActions.hover({})).toEqual([
    {
      type: 'dispatch',
      constructor: 'MouseEvent',
      eventType: 'mouseenter',
      options: {},
    },
  ])
})

test('type', () => {
  expect(ElementActions.type({ text: 'abc' })).toEqual([
    {
      type: 'type',
      constructor: '',
      eventType: '',
      options: { text: 'abc' },
    },
  ])
})

test('keyboardEvent', () => {
  expect(ElementActions.keyboardEvent('keydown', { key: 'a' })).toEqual({
    type: 'dispatch',
    constructor: 'MouseEvent',
    eventType: 'keydown',
    options: { key: 'a' },
  })
})

test('keyDown', () => {
  expect(ElementActions.keyDown({ key: 'a' })).toEqual([
    {
      type: 'dispatch',
      constructor: 'MouseEvent',
      eventType: 'keydown',
      options: { key: 'a' },
    },
  ])
})

test('keyUp', () => {
  expect(ElementActions.keyUp({ key: 'a' })).toEqual([
    {
      type: 'dispatch',
      constructor: 'MouseEvent',
      eventType: 'keyup',
      options: { key: 'a' },
    },
  ])
})
