import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ComponentState from '../src/parts/TestFrameWorkComponentComponentState/TestFrameWorkComponentComponentState.ts'

test('getComponents', async () => {
  const components = [{ editable: true, moduleId: 'Explorer', uid: 7 }]
  using mockRpc = RendererWorker.registerMockRpc({
    'ComponentState.getComponents'() {
      return components
    },
  })

  await expect(ComponentState.getComponents()).resolves.toBe(components)
  expect(mockRpc.invocations).toEqual([['ComponentState.getComponents']])
})

test('getState', async () => {
  const state = { focusedIndex: 3, uid: 7 }
  using mockRpc = RendererWorker.registerMockRpc({
    'ComponentState.getState'() {
      return state
    },
  })

  await expect(ComponentState.getState(7)).resolves.toBe(state)
  expect(mockRpc.invocations).toEqual([['ComponentState.getState', 7]])
})

test('setState', async () => {
  const state = { focusedIndex: 3, uid: 7 }
  using mockRpc = RendererWorker.registerMockRpc({
    'ComponentState.setState'() {
      return undefined
    },
  })

  await ComponentState.setState(7, state)
  expect(mockRpc.invocations).toEqual([['ComponentState.setState', 7, state]])
})
