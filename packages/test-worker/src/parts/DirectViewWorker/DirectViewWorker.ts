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

const rpcs = new Set<Promise<Rpc>>()

const createRpc = (rpcId: string): Promise<Rpc> => {
  return LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    async send(port) {
      await RendererWorker.invokeAndTransfer('SendMessagePortToExtensionHostWorker.sendMessagePortToViewWorker', port, rpcId)
    },
  })
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
  // A view can dispose its worker between commands. A command-scoped port also
  // avoids invalidating another view's in-flight command when its uid changes.
  const pendingRpc = createRpc(rpcId)
  rpcs.add(pendingRpc)
  try {
    const rpc = await pendingRpc
    const separatorIndex = commandId.indexOf('.')
    const command = commandId.slice(separatorIndex + 1)
    return await rpc.invoke('Viewlet.executeViewletCommand', uid, command, ...args)
  } finally {
    if (rpcs.delete(pendingRpc)) {
      const rpc = await pendingRpc.catch(() => undefined)
      await rpc?.dispose()
    }
  }
}

export const dispose = async (): Promise<void> => {
  const pendingRpcs = [...rpcs]
  rpcs.clear()
  await Promise.all(
    pendingRpcs.map(async (pendingRpc) => {
      const rpc = await pendingRpc.catch(() => undefined)
      await rpc?.dispose()
    }),
  )
}
