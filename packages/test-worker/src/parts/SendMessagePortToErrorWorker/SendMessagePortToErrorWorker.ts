import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const sendMessagePortToErrorWorker = async (port: MessagePort): Promise<void> => {
  const command = 'HandleMessagePort.handleMessagePort2'
  // @ts-ignore
  await RendererWorker.invokeAndTransfer(
    // @ts-ignore
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker',
    port,
    command,
    0, // TODO
  )
}
