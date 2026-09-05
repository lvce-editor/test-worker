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

test('getComponent returns the matching live component', async () => {
  const components = [{ editable: true, moduleId: 'Explorer', uid: 0.25 }]
  using mockRpc = RendererWorker.registerMockRpc({
    'ComponentState.getComponents'() {
      return components
    },
  })

  await expect(ComponentState.getComponent('Explorer')).resolves.toBe(components[0])
  expect(mockRpc.invocations).toEqual([['ComponentState.getComponents']])
})

test('getComponent reports a missing component', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ComponentState.getComponents'() {
      return []
    },
  })

  await expect(ComponentState.getComponent('Explorer')).rejects.toThrow('Expected component Explorer to exist but found []')
  expect(mockRpc.invocations).toEqual([['ComponentState.getComponents']])
})

test('handlePointerDown waits for the view command to finish rendering', async () => {
  const started = Promise.withResolvers<void>()
  const rendered = Promise.withResolvers<void>()
  using mockRpc = RendererWorker.registerMockRpc({
    'ComponentState.getComponents'() {
      return [{ editable: true, moduleId: 'ComponentState', uid: 9 }]
    },
    'Viewlet.executeViewletCommand'() {
      started.resolve()
      return rendered.promise
    },
  })
  let completed = false
  const action = (async (): Promise<void> => {
    await ComponentState.handlePointerDown(0, 0.25)
    completed = true
  })()

  await started.promise
  expect(completed).toBe(false)
  expect(mockRpc.invocations).toEqual([['ComponentState.getComponents'], ['Viewlet.executeViewletCommand', 9, 'handlePointerDown', 0, '0.25']])
  rendered.resolve()
  await action
  expect(completed).toBe(true)
})
