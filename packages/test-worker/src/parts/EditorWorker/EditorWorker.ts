import { createLazyRpc, RpcId } from '@lvce-editor/rpc-registry'

const lazyRpc = createLazyRpc(RpcId.EditorWorker)

export const { invoke, setFactory } = lazyRpc
