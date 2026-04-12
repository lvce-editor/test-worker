import type { ILocator } from '../ILocator/ILocator.ts'
import { getLocatorInvoke } from '../GetLocatorInvoke/GetLocatorInvoke.ts'

export const performAction = async (locator: ILocator, action: string, options: any): Promise<any> => {
  const invoke = getLocatorInvoke(locator)
  return invoke('TestFrameWork.performAction', locator, action, options)
}
