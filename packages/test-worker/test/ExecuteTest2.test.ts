import { expect, test } from '@jest/globals'
import * as ExecuteTest2 from '../src/parts/ExecuteTest2/ExecuteTest2.ts'
import * as TestType from '../src/parts/TestType/TestType.ts'

const timestampGenerator1 = (): number => 1000
const testFunction1 = async (): Promise<void> => {
  // Simulate successful test
}

const timestampGenerator2 = (): number => 2000
const testFunction2 = async (): Promise<void> => {
  throw new Error('Test failed')
}

let callCount = 0
const timestampGenerator3 = (): number => {
  callCount++
  return callCount * 1000
}
const testFunction3 = async (): Promise<void> => {
  // Simulate some work
}

const timestampGenerator4 = (): number => 3000
const testFunction4 = async (): Promise<void> => {
  throw 'String error'
}

const timestampGenerator5 = (): number => 4000
const testFunction5 = async (): Promise<void> => {
  throw undefined
}

const timestampGenerator7 = (): number => 5000
const receivedGlobals: any = {}
const testFunction7 = async (globals: any): Promise<void> => {
  Object.assign(receivedGlobals, globals)
}

test('executeTest2 with successful test function', async () => {
  const globals = {}

  const result = await ExecuteTest2.executeTest2('test-name', testFunction1, globals, timestampGenerator1)

  expect(result.name).toBe('test-name')
  expect(result.error).toBeUndefined()
  expect(result.start).toBe(1000)
  expect(result.end).toBe(1000)
  expect(result.duration).toBe(0)
  expect(result.formattedDuration).toBe('0.00ms')
  expect(result.type).toBe(TestType.Pass)
  expect(result.background).toBe('green')
  expect(result.text).toBe('test passed in 0.00ms')
})

test('executeTest2 with failing test function', async () => {
  const globals = {}

  const result = await ExecuteTest2.executeTest2('failing-test', testFunction2, globals, timestampGenerator2)

  expect(result.name).toBe('failing-test')
  expect(result.error).toBeInstanceOf(Error)
  expect(result.error.message).toBe('Test failed')
  expect(result.start).toBe(2000)
  expect(result.end).toBe(2000)
  expect(result.duration).toBe(0)
  expect(result.formattedDuration).toBe('0.00ms')
  expect(result.type).toBe(TestType.Fail)
  expect(result.background).toBe('red')
  expect(result.text).toBe('test failed: Error: Test failed')
})

test('executeTest2 with different timestamps', async () => {
  const globals = {}

  const result = await ExecuteTest2.executeTest2('timed-test', testFunction3, globals, timestampGenerator3)

  expect(result.name).toBe('timed-test')
  expect(result.error).toBeUndefined()
  expect(result.start).toBe(1000)
  expect(result.end).toBe(2000)
  expect(result.duration).toBe(1000)
  expect(result.formattedDuration).toBe('1000.00ms')
  expect(result.type).toBe(TestType.Pass)
  expect(result.background).toBe('green')
  expect(result.text).toBe('test passed in 1000.00ms')
})

test('executeTest2 with non-Error exception', async () => {
  const globals = {}

  const result = await ExecuteTest2.executeTest2('string-error-test', testFunction4, globals, timestampGenerator4)

  expect(result.name).toBe('string-error-test')
  expect(result.error).toBe('String error')
  expect(result.start).toBe(3000)
  expect(result.end).toBe(3000)
  expect(result.duration).toBe(0)
  expect(result.formattedDuration).toBe('0.00ms')
  expect(result.type).toBe(TestType.Fail)
  expect(result.background).toBe('red')
  expect(result.text).toBe('test failed: String error')
})

test('executeTest2 with undefined error', async () => {
  const globals = {}

  const result = await ExecuteTest2.executeTest2('undefined-error-test', testFunction5, globals, timestampGenerator5)

  expect(result.name).toBe('undefined-error-test')
  expect(result.error).toBeUndefined()
  expect(result.start).toBe(4000)
  expect(result.end).toBe(4000)
  expect(result.duration).toBe(0)
  expect(result.formattedDuration).toBe('0.00ms')
  expect(result.type).toBe(TestType.Pass)
  expect(result.background).toBe('green')
  expect(result.text).toBe('test passed in 0.00ms')
})

test('executeTest2 with globals passed to test function', async () => {
  const globals = { testValue: 'hello', anotherValue: 42 }

  const result = await ExecuteTest2.executeTest2('globals-test', testFunction7, globals, timestampGenerator7)

  expect(result.name).toBe('globals-test')
  expect(result.error).toBeUndefined()
  expect(receivedGlobals).toEqual(globals)
  expect(result.type).toBe(TestType.Pass)
})
