import { createLazyRpc, RpcId } from '@lvce-editor/rpc-registry'

const lazyRpc = createLazyRpc(RpcId.EditorWorker)
export const { invoke, setFactory } = lazyRpc

// Add registerMockRpc if it exists
export const registerMockRpc = (lazyRpc as any).registerMockRpc
