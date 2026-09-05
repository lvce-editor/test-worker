import * as TestState from '../TestState/TestState.ts'

export const executeMockRpcFunction = async (name: string, method: string, ...params: readonly unknown[]): Promise<unknown> => {
  const mockRpc = TestState.getMockRpc(name)
  if (!mockRpc) {
    throw new Error(`mock rpc not found: ${name}`)
  }
  const fn = mockRpc.commands?.[method]
  if (typeof fn !== 'function') {
    throw new TypeError(`mock rpc command not found: ${name}.${method}`)
  }
  return fn(...params)
}
