import { expect, test } from '@jest/globals'
import { main } from '../src/parts/Main/Main.ts'

test('main', () => {
  expect(typeof main).toBe('function')
})
