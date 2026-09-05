import { LazyTransferMessagePortRpcParent, type Rpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

const rendererWorkerCommands = new Set([
  'ActivityBar.handleSideBarHidden',
  'About.showAbout',
  'Chat.handleInputCut',
  'Chat.handleInputPaste',
  'Chat.getComposerSelection',
  'Chat.selectIndex',
  'Chat.setNewChatModelPickerEnabled',
  'ChatDebug.setIndexedDbSupportForTest',
  'ChatDebug.getPayload',
  'ChatDebug.getResponse',
  'DiffView.setWordWrap',
  'ExtensionDetail.selectFeature',
  'Explorer.restoreState',
  'LanguageModels.addModel',
  'LanguageModels.clearFilterInput',
  'LanguageModels.removeModel',
  'Main.closeTabsLeft',
  'Main.focusFirst',
  'Main.focusLast',
  'Main.openKeyBindings',
  'Main.saveAll',
  'QuickPick.showCommands',
  'Search.focusPage',
  'Search.handleInputConextMenu',
  'Search.openDetails',
  'StatusBar.updateStatusBarItems',
])

const rpcs = new Map<string, Promise<Rpc>>()

const createRpc = (rpcId: string): Promise<Rpc> => {
  return LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    async send(port) {
      await RendererWorker.invokeAndTransfer('SendMessagePortToExtensionHostWorker.sendMessagePortToViewWorker', port, rpcId)
    },
  })
}

const getRpc = (rpcId: string): Promise<Rpc> => {
  let rpc = rpcs.get(rpcId)
  if (!rpc) {
    rpc = createRpc(rpcId)
    rpcs.set(rpcId, rpc)
  }
  return rpc
}

export const invoke = async (rpcId: string, commandId: string, ...args: readonly any[]): Promise<any> => {
  if (!RendererProcess.isInitialized() || rendererWorkerCommands.has(commandId)) {
    return RendererWorker.invoke(commandId, ...args)
  }
  let uid: number
  try {
    uid = await RendererProcess.invoke('DirectView.getUid', rpcId)
  } catch {
    return RendererWorker.invoke(commandId, ...args)
  }
  const rpc = await getRpc(rpcId)
  const separatorIndex = commandId.indexOf('.')
  const command = commandId.slice(separatorIndex + 1)
  return rpc.invoke('Viewlet.executeViewletCommand', uid, command, ...args)
}

export const dispose = async (): Promise<void> => {
  const pendingRpcs = rpcs.values().toArray()
  rpcs.clear()
  const resolvedRpcs = await Promise.all(pendingRpcs)
  await Promise.all(resolvedRpcs.map((rpc) => rpc.dispose()))
}
