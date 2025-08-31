import { expect, test } from '@jest/globals'
import { MessageChannel as NodeMessageChannel, MessagePort as NodeMessagePort } from 'worker_threads'

// Polyfill global MessageChannel/MessagePort for Node test environment
;(globalThis as any).MessageChannel = (globalThis as any).MessageChannel || NodeMessageChannel
;(globalThis as any).MessagePort = (globalThis as any).MessagePort || NodeMessagePort

import * as GetPortTuple from '../src/parts/GetPortTuple/GetPortTuple.ts'

test('getPortTuple returns two connected MessagePorts', () => {
  const { port1, port2 } = GetPortTuple.getPortTuple()
  expect(port1).toBeDefined()
  expect(port2).toBeDefined()
  expect(port1).not.toBe(port2)
  expect(typeof (port1 as any).postMessage).toBe('function')
  expect(typeof (port2 as any).postMessage).toBe('function')
})
