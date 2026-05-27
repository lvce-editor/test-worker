import { expect, test } from '@jest/globals'
import { trySerialize } from '../src/parts/TryAutoFixTrySerialize/TryAutoFixTrySerialize.ts'

test('trySerialize serializes nested objects with escaped strings', () => {
  const serialized = trySerialize({
    'data-value': 'line 1\nline 2',
    nested: [{ quote: "it's fine" }],
  })

  expect(serialized).toBe(`{
  'data-value': 'line 1\\nline 2',
  nested: [
    {
      quote: 'it\\'s fine'
    }
  ]
}`)
})

test('trySerialize returns undefined for unsupported values', () => {
  expect(trySerialize(1n)).toBeUndefined()
})
