import { expect, test } from '@jest/globals'
import * as GetBrowserName from '../src/parts/GetBrowserName/GetBrowserName.ts'
import * as ShouldSkipTest from '../src/parts/ShouldSkipTest/ShouldSkipTest.ts'

test('shouldSkipTest returns true for true', () => {
  expect(ShouldSkipTest.shouldSkipTestWithBrowserName(true, 'unknown')).toBe(true)
})

test('shouldSkipTest returns true for 1', () => {
  expect(ShouldSkipTest.shouldSkipTestWithBrowserName(1, 'unknown')).toBe(true)
})

test('shouldSkipTest returns true for matching browser', () => {
  expect(ShouldSkipTest.shouldSkipTestWithBrowserName(['webkit'], 'webkit')).toBe(true)
})

test('shouldSkipTest returns false for chromium when skip targets webkit', () => {
  expect(ShouldSkipTest.shouldSkipTestWithBrowserName(['webkit'], 'chromium')).toBe(false)
})

test('shouldSkipTest returns false for firefox when skip targets webkit', () => {
  expect(ShouldSkipTest.shouldSkipTestWithBrowserName(['webkit'], 'firefox')).toBe(false)
})

test('shouldSkipTest returns false for empty array', () => {
  expect(ShouldSkipTest.shouldSkipTestWithBrowserName([], 'webkit')).toBe(false)
})

test('shouldSkipTest returns false for false', () => {
  expect(ShouldSkipTest.shouldSkipTestWithBrowserName(false, 'unknown')).toBe(false)
})

test('getBrowserNameFromUserAgent detects firefox', () => {
  expect(GetBrowserName.getBrowserNameFromUserAgent('Mozilla/5.0 Firefox/145.0')).toBe('firefox')
})

test('getBrowserNameFromUserAgent detects chromium', () => {
  expect(GetBrowserName.getBrowserNameFromUserAgent('Mozilla/5.0 Chrome/145.0 Safari/537.36')).toBe('chromium')
})

test('getBrowserNameFromUserAgent detects webkit', () => {
  expect(GetBrowserName.getBrowserNameFromUserAgent('Mozilla/5.0 Version/18.0 Safari/605.1.15')).toBe('webkit')
})
