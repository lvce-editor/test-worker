import { createLazyRpc, RpcId } from '@lvce-editor/rpc-registry'

export const { invoke, setFactory, registerMockRpc } = createLazyRpc(RpcId.EditorWorker)
