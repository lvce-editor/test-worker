import { RendererWorker } from '@lvce-editor/rpc-registry'

export const sendMessagePortToErrorWorker = async (port: MessagePort): Promise<void> => {
  const command = 'Errors.handleMessagePort'

  await RendererWorker.invokeAndTransfer('SendMessagePortToExtensionHostWorker.sendMessagePortToErrorWorker', port, command, 0)
}
