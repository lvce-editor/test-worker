import * as IpcChildModule from '../IpcChildModule/IpcChildModule.ts'

export const listen = async ({ method }: { readonly method: any }): Promise<any> => {
  const module = await IpcChildModule.getModule(method)
  const rawIpc = await module.listen()
  if (module.signal) {
    module.signal(rawIpc)
  }
  const ipc = module.wrap(rawIpc)
  return ipc
}
