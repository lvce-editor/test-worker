// @ts-nocheck

import * as Assert from '../Assert/Assert.ts'

const state = {
  mockRpcs: Object.create(null),
  /**
   * @type {any[]}
   */
  pendingTests: [],
}

export const addTest = (name: string, fn: any): void => {
  state.pendingTests.push({ fn, name })
}

export const getTests = (): any[] => {
  const tests = state.pendingTests
  state.pendingTests = []
  return tests
}

export const setMockRpc = (mockRpc: any): void => {
  Assert.object(mockRpc)
  Assert.string(mockRpc.name)
  state.mockRpcs[mockRpc.name] = mockRpc
}

export const getMockRpc = (name: string): any => {
  return state.mockRpcs[name]
}
