import type { Rpc } from '@lvce-editor/rpc'
import { launchEditorWorkerRpc } from '../LaunchEditorWorkerRpc/LaunchEditorWorkerRpc.ts'

let rpcPromise: Promise<Rpc> | undefined

const getRpc = (): Promise<Rpc> => {
  if (!rpcPromise) {
    rpcPromise = launchEditorWorkerRpc()
  }
  return rpcPromise
}

export const invoke = async (method: string, ...params: readonly any[]): Promise<any> => {
  const rpc = await getRpc()
  return rpc.invoke(method, ...params)
}

export const reset = (): void => {
  rpcPromise = undefined
}
