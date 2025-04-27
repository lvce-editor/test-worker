import * as GetLocatorRpc from '../GetLocatorRpc/GetLocatorRpc.ts'

export const locatorInvoke = (locator: any, method: string, ...params: readonly any[]): Promise<any> => {
  const { invoke } = GetLocatorRpc.getLocatorRpc(locator)
  return invoke(method, ...params)
}
