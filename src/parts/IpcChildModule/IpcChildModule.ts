// @ts-ignore
import { IpcChildWithModuleWorker, IpcChildWithModuleWorkerAndMessagePort } from '@lvce-editor/ipc/dist/browser.js'
import * as IpcChildType from '../IpcChildType/IpcChildType.ts'

export const getModule = (method: any): any => {
  switch (method) {
    case IpcChildType.ModuleWorker:
      return IpcChildWithModuleWorker
    case IpcChildType.ModuleWorkerAndMessagePort:
      return IpcChildWithModuleWorkerAndMessagePort
    default:
      throw new Error('unexpected ipc type')
  }
}
