import * as Assert from '../Assert/Assert.ts'
import * as GetLocatorRpc from '../GetLocatorRpc/GetLocatorRpc.ts'

export const locatorInvoke = (locator: any, method: string, ...params: readonly any[]): Promise<any> => {
  Assert.object(locator)
  Assert.string(method)
  const { invoke } = GetLocatorRpc.getLocatorRpc(locator)
  return invoke(method, ...params)
}
