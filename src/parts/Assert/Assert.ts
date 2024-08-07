// TODO treeshake out this whole module in production

import { AssertionError } from '../AssertionError/AssertionError.ts'

const getType = (value: any) => {
  switch (typeof value) {
    case 'number':
      return 'number'
    case 'function':
      return 'function'
    case 'string':
      return 'string'
    case 'object':
      if (value === null) {
        return 'null'
      }
      if (Array.isArray(value)) {
        return 'array'
      }
      if (value instanceof Uint32Array) {
        return 'uint32array'
      }
      return 'object'
    case 'boolean':
      return 'boolean'
    default:
      return 'unknown'
  }
}

export const object = (value: any) => {
  const type = getType(value)
  if (type !== 'object') {
    throw new AssertionError('expected value to be of type object')
  }
}

export const number = (value: any) => {
  const type = getType(value)
  if (type !== 'number') {
    throw new AssertionError('expected value to be of type number')
  }
  if (isNaN(value)) {
    throw new AssertionError('value is NaN')
  }
}

export const array = (value: any) => {
  const type = getType(value)
  if (type !== 'array') {
    throw new AssertionError('expected value to be of type array')
  }
}

export const string = (value: any) => {
  const type = getType(value)
  if (type !== 'string') {
    throw new AssertionError('expected value to be of type string')
  }
}

export const null_ = (value: any) => {
  const type = getType(value)
  if (type !== 'null') {
    throw new AssertionError('expected value to be of type null')
  }
}

export const boolean = (value: any) => {
  const type = getType(value)
  if (type !== 'boolean') {
    throw new AssertionError('expected value to be of type boolean')
  }
}

export const fn = (value: any) => {
  const type = getType(value)
  if (type !== 'function') {
    throw new AssertionError('expected value to be of type function')
  }
}

export const uint32array = (value: any) => {
  const type = getType(value)
  if (type !== 'uint32array') {
    throw new AssertionError('expected value to be of type uint32array')
  }
}

export const greaterZero = (value: any) => {
  if (value <= 0) {
    throw new Error('value must be greater than zero')
  }
}
