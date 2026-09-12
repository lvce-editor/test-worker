import { LazyTransferMessagePortRpcParent, type Rpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

const isRendererWorkerCommand = (commandId: string): boolean => {
  switch (commandId) {
    case 'About.showAbout':
    case 'ActivityBar.handleSideBarHidden':
    case 'Chat.getComposerSelection':
    case 'Chat.handleInputCut':
    case 'Chat.handleInputPaste':
    case 'Chat.selectIndex':
    case 'Chat.setNewChatModelPickerEnabled':
    case 'ChatDebug.getPayload':
    case 'ChatDebug.getResponse':
    case 'ChatDebug.setIndexedDbSupportForTest':
    case 'DiffView.setWordWrap':
    case 'Explorer.restoreState':
    case 'ExtensionDetail.selectFeature':
    case 'LanguageModels.addModel':
    case 'LanguageModels.clearFilterInput':
    case 'LanguageModels.removeModel':
    case 'Main.closeTabsLeft':
    case 'Main.focusFirst':
    case 'Main.focusLast':
    case 'Main.openKeyBindings':
    case 'Main.saveAll':
    case 'QuickPick.showCommands':
    case 'Search.focusPage':
    case 'Search.handleInputConextMenu':
    case 'Search.openDetails':
    case 'StatusBar.updateStatusBarItems':
      return true
    default:
      return false
  }
}

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
  if (!RendererProcess.isInitialized() || isRendererWorkerCommand(commandId)) {
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
