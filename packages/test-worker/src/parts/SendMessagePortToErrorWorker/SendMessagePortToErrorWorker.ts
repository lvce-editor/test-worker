import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

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
