import { expect, jest, test } from '@jest/globals'

const listen = jest.fn(async () => undefined)

jest.unstable_mockModule('../src/parts/Listen/Listen.ts', () => ({
  listen,
}))

const { main } = await import('../src/parts/Main/Main.ts')

test('main', () => {
  expect(typeof main).toBe('function')
})

test('main starts listening', async () => {
  await main()

  expect(listen).toHaveBeenCalledTimes(1)
})
