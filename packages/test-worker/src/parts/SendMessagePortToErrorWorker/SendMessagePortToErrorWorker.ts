import { RendererWorker } from '@lvce-editor/rpc-registry'

export const sendMessagePortToErrorWorker = async (port: MessagePort): Promise<void> => {
  const command = 'Errors.handleMessagePort'
  // @ts-ignore
  await RendererWorker.invokeAndTransfer(
    // @ts-ignore
    'SendMessagePortToExtensionHostWorker.sendMessagePortToErrorWorker',
    port,
    command,
    0,
  )
}
