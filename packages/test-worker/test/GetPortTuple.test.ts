import { expect, test } from '@jest/globals'
import * as GetPortTuple from '../src/parts/GetPortTuple/GetPortTuple.ts'

test('getPortTuple returns two connected MessagePorts', () => {
  const { port1, port2 } = GetPortTuple.getPortTuple()
  expect(port1).toBeDefined()
  expect(port2).toBeDefined()
  expect(port1).not.toBe(port2)
  expect(typeof port1.postMessage).toBe('function')
  expect(typeof port2.postMessage).toBe('function')
})
