import * as Rpc from '../ParentRpc/ParentRpc.ts'

// eslint-disable-next-line  @typescript-eslint/prefer-readonly-parameter-types
export const sendPortToWebView = async (webviewId: string, port: MessagePort): Promise<void> => {
  await Rpc.invokeAndTransfer('Transferrable.transferToRendererProcess', webviewId, port)
  console.log('did send port to renderer process')
}
