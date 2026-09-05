import { expect, test } from '@jest/globals'
import { roundTestResults } from '../src/parts/RoundTestResults/RoundTestResults.ts'

test('roundTestResults rounds timestamps to at most two decimal places', () => {
  const results = roundTestResults([
    {
      end: 267.2149999999674,
      name: 'sample.js',
      start: 262.89000000001397,
      status: 'pass',
    },
  ])

  expect(results).toEqual([
    {
      end: 267.21,
      name: 'sample.js',
      start: 262.89,
      status: 'pass',
    },
  ])
})

test('roundTestResults does not mutate input results', () => {
  const result = {
    end: 1.234,
    start: 0.123,
  }

  const results = roundTestResults([result])

  expect(results[0]).not.toBe(result)
  expect(result).toEqual({
    end: 1.234,
    start: 0.123,
  })
})
