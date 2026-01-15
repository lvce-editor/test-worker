import { expect, test, jest } from '@jest/globals'
import * as ClearConsole from '../src/parts/ClearConsole/ClearConsole.js'

test('clearConsole function exists and is exported', () => {
  expect(ClearConsole.clearConsole).toBeDefined()
  expect(typeof ClearConsole.clearConsole).toBe('function')
})

test('clearConsole calls console.clear', () => {
  const consoleSpy = jest.spyOn(console, 'clear').mockImplementation(() => {})

  try {
    ClearConsole.clearConsole()
    expect(consoleSpy).toHaveBeenCalledTimes(1)
  } finally {
    consoleSpy.mockRestore()
  }
})

test('clearConsole returns undefined', () => {
  const consoleSpy = jest.spyOn(console, 'clear').mockImplementation(() => {})

  try {
    const result = ClearConsole.clearConsole()
    expect(result).toBeUndefined()
  } finally {
    consoleSpy.mockRestore()
  }
})
