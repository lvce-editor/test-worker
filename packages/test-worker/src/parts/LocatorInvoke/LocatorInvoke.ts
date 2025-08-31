import * as Assert from '../Assert/Assert.ts'
import { getLocatorInvoke } from '../GetLocatorInvoke/GetLocatorInvoke.ts'

export const locatorInvoke = async (locator: any, method: string, ...params: readonly any[]): Promise<any> => {
  Assert.object(locator)
  Assert.string(method)
  const invoke = getLocatorInvoke(locator)
  return invoke(method, ...params)
}
