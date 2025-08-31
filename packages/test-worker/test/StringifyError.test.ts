import { expect, test } from '@jest/globals'
import * as StringifyError from '../src/parts/StringifyError/StringifyError.ts'

class CustomErr {
  readonly message: string
  constructor(message: string) {
    this.message = message
  }
  toString(): string {
    return `CustomErr: ${this.message}`
  }
}

class VErrorExact extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'VError'
  }
}

test('stringifyError with undefined', () => {
  expect(StringifyError.stringifyError(undefined)).toBe('undefined')
})

test('stringifyError with null', () => {
  expect(StringifyError.stringifyError(null)).toBe('null')
})

test('stringifyError with non-standard error class', () => {
  const err = new CustomErr('oops')
  // has message and constructor.name !== Error/VError
  // returns `${error}` which uses toString
  expect(StringifyError.stringifyError(err)).toBe('CustomErr: oops')
})

test('stringifyError with standard Error', () => {
  const err = new Error('boom')
  expect(StringifyError.stringifyError(err)).toBe('boom')
})

test('stringifyError with VError', () => {
  const err = new VErrorExact('wrapped')
  expect(StringifyError.stringifyError(err)).toBe('wrapped')
})
