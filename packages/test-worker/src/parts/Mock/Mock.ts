import type { MockFn } from '../MockFn/MockFn.ts'
import { createId } from '../CreateId/CreateId.ts'

const mocks: Record<string, MockFn> = Object.create(null)

export const registerMock = (fn: MockFn): number => {
  const id = createId()
  mocks[id] = fn
  return id
}

export const executeMock = (id: number, ...args: readonly any[]): string => {
  const fn = mocks[id]
  return fn(...args)
}
