import { createId } from '../CreateId/CreateId.ts'
import { MockFn } from '../MockFn/MockFn.ts'

const mocks: Record<string, MockFn> = Object.create(null)

export const registerMock = (fn: MockFn): number => {
  const id = createId()
  mocks[id] = fn
  return id
}

export const executeMock = (id: number): string => {
  const fn = mocks[id]
  return fn()
}
