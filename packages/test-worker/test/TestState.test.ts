import { expect, jest, test } from '@jest/globals'
import * as TestState from '../src/parts/TestState/TestState.ts'

const createMockRpc = (name: string): any => {
  return { invoke: jest.fn(), name }
}

test('addTest and getTests empties queue', () => {
  TestState.addTest('t1', () => {})
  TestState.addTest('t2', () => {})
  const tests1 = TestState.getTests()
  expect(Array.isArray(tests1)).toBe(true)
  expect(tests1.map((t: any) => t.name)).toEqual(['t1', 't2'])
  const tests2 = TestState.getTests()
  expect(tests2).toEqual([])
})

test('setMockRpc and getMockRpc by name', () => {
  const rpcA = createMockRpc('A')
  const rpcB = createMockRpc('B')
  TestState.setMockRpc(rpcA)
  TestState.setMockRpc(rpcB)
  expect(TestState.getMockRpc('A')).toBe(rpcA)
  expect(TestState.getMockRpc('B')).toBe(rpcB)
  expect(TestState.getMockRpc('C')).toBeUndefined()
})
