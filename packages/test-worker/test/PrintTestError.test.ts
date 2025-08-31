import { expect, jest, test } from '@jest/globals'

await jest.unstable_mockModule('../src/parts/PrintError/PrintError.ts', () => ({
  printError: jest.fn(),
}))

const PrintError = await import('../src/parts/PrintError/PrintError.ts')
const PrintTestError = await import('../src/parts/PrintTestError/PrintTestError.ts')

test('printTestError calls printError', async () => {
  const error = new Error('boom')
  await PrintTestError.printTestError(error)
  expect(PrintError.printError).toHaveBeenCalledTimes(1)
  expect(PrintError.printError).toHaveBeenCalledWith(error)
})
