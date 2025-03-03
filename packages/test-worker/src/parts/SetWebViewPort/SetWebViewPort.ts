import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

// eslint-disable-next-line  @typescript-eslint/prefer-readonly-parameter-types
export const setWebViewPort = async (uid: number, port: MessagePort, origin: string, portType: string): Promise<void> => {
  await ParentRpc.invokeAndTransfer('WebView.setPort', uid, port, origin, portType)
}
