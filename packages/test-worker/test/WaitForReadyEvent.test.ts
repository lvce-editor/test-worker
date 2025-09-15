import { expect, test } from '@jest/globals'
import { setTimeout } from 'node:timers/promises'
import * as WaitForReadyEvent from '../src/parts/WaitForReadyEvent/WaitForReadyEvent.ts'

test('waitForFirstEventEvent resolves with the first message event', async () => {
  const { port1, port2 } = new MessageChannel()

  const testData = { message: 'test data' }

  const resultPromise = WaitForReadyEvent.waitForFirstEventEvent(port1)
  port2.postMessage(testData)

  const result = await resultPromise

  expect(result).toBeInstanceOf(MessageEvent)
  expect(result.data).toEqual(testData)

  // Close ports to prevent leaks
  port1.close()
  port2.close()
})

test('waitForFirstEventEvent resolves immediately if message is already queued', async () => {
  const { port1, port2 } = new MessageChannel()

  const testData = { message: 'immediate test' }

  // Send message immediately
  port2.postMessage(testData)

  const result = await WaitForReadyEvent.waitForFirstEventEvent(port1)

  expect(result).toBeInstanceOf(MessageEvent)
  expect(result.data).toEqual(testData)

  // Close ports to prevent leaks
  port1.close()
  port2.close()
})

test('waitForFirstEventEvent handles multiple messages by returning only the first', async () => {
  const { port1, port2 } = new MessageChannel()

  const firstData = { message: 'first' }
  const secondData = { message: 'second' }

  // Send multiple messages
  port2.postMessage(firstData)
  port2.postMessage(secondData)

  const result = await WaitForReadyEvent.waitForFirstEventEvent(port1)

  expect(result).toBeInstanceOf(MessageEvent)
  expect(result.data).toEqual(firstData)

  // Close ports to prevent leaks
  port1.close()
  port2.close()
})

test('waitForFirstEventEvent works with different data types', async () => {
  const testCases = ['string message', 42, { complex: { nested: 'object' } }, [1, 2, 3], null]

  for (const testData of testCases) {
    const { port1, port2 } = new MessageChannel()
    port2.postMessage(testData)
    const result = await WaitForReadyEvent.waitForFirstEventEvent(port1)
    expect(result.data).toEqual(testData)

    // Close ports to prevent leaks
    port1.close()
    port2.close()
  }
})
