import { RendererWorker } from '@lvce-editor/rpc-registry'

export const { set } = RendererWorker

export const invoke = RendererWorker.invoke as any

export const invokeAndTransfer = RendererWorker.invokeAndTransfer as any
