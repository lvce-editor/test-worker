import { RendererWorker as Rpc } from '@lvce-editor/rpc-registry'
import { createId } from '../CreateId/CreateId.ts'

const callbacks = Object.create(null)

export const executeCallback = (id: number): void => {
  const fn = callbacks[id]
  delete callbacks[id]
  fn()
}

export const registerCallbackCommand = async (commandId: string): Promise<any> => {
  const id = createId()
  const { promise, resolve } = Promise.withResolvers()
  callbacks[id] = resolve

  await Rpc.invoke(`Test.registerTestCommand`, commandId)
  return {
    promise,
  }
}
