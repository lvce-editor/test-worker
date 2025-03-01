import { expect, test } from '@jest/globals'
import * as NameAnonymousFunction from '../src/parts/NameAnonymousFunction/NameAnonymousFunction.ts'

const fn = (): void => {}

test('nameAnonymousFunction', () => {
  NameAnonymousFunction.nameAnonymousFunction(fn, 'test function')
  expect(fn.name).toBe('test function')
})
