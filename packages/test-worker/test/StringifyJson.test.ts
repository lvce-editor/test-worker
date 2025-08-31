import { expect, test } from '@jest/globals'
import * as StringifyJson from '../src/parts/StringifyJson/StringifyJson.ts'

test('stringifyJson pretty prints with newline', () => {
  const input = { a: 1, b: { c: true } }
  const result: string = StringifyJson.stringifyJson(input)
  const expected = `{
  "a": 1,
  "b": {
    "c": true
  }
}
`
  expect(result).toBe(expected)
})
