import { expect, jest, test } from '@jest/globals'

const tryAutoFixWithMock = jest.fn(async () => undefined)

jest.unstable_mockModule('../src/parts/TryAutoFixWith/TryAutoFixWith.ts', () => ({
  tryAutoFixWith: tryAutoFixWithMock,
}))

const { tryAutoFix } = await import('../src/parts/TryAutoFix/TryAutoFix.ts')

test('tryAutoFix delegates to tryAutoFixWith', async () => {
  await tryAutoFix()

  expect(tryAutoFixWithMock).toHaveBeenCalledTimes(1)
})
