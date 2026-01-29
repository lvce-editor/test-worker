import { expect, test, beforeEach, jest } from '@jest/globals'

const TestInfoCache = await import('../src/parts/TestInfoCache/TestInfoCache.ts')

beforeEach(() => {
  globalThis.location = { href: 'http://localhost:3000' } as any
  TestInfoCache.clear()
})

const HandleFileWatcherEvent = await import('../src/parts/HandleFileWatcherEvent/HandleFileWatcherEvent.ts')

test('handleFileWatcherEvent is a function', () => {
  expect(HandleFileWatcherEvent.handleFileWatcherEvent).toBeDefined()
  expect(typeof HandleFileWatcherEvent.handleFileWatcherEvent).toBe('function')
})

test('handleFileWatcherEvent returns a promise', async () => {
  const event = {}
  const result = HandleFileWatcherEvent.handleFileWatcherEvent(event)

  expect(result).toBeInstanceOf(Promise)
  await result
})

test('handleFileWatcherEvent accepts any event parameter', async () => {
  const testEvents = [null, undefined, {}, { type: 'change' }, { path: '/some/file.txt' }]

  for (const event of testEvents) {
    const result = HandleFileWatcherEvent.handleFileWatcherEvent(event)
    expect(result).toBeInstanceOf(Promise)
    await result
  }
})

test('handleFileWatcherEvent can be called multiple times', async () => {
  const event = {}

  const promise1 = HandleFileWatcherEvent.handleFileWatcherEvent(event)
  const promise2 = HandleFileWatcherEvent.handleFileWatcherEvent(event)
  const promise3 = HandleFileWatcherEvent.handleFileWatcherEvent(event)

  expect(promise1).toBeInstanceOf(Promise)
  expect(promise2).toBeInstanceOf(Promise)
  expect(promise3).toBeInstanceOf(Promise)

  await Promise.all([promise1, promise2, promise3])
})

test('handleFileWatcherEvent resolves without throwing', async () => {
  const event = {}

  await expect(HandleFileWatcherEvent.handleFileWatcherEvent(event)).resolves.toBeUndefined()
})
