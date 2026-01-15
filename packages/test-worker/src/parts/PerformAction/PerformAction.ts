import { getLocatorInvoke } from '../GetLocatorInvoke/GetLocatorInvoke.ts'

export const performAction = async (locator: any, action: string, options: any): Promise<any> => {
  const invoke = getLocatorInvoke(locator)
  return invoke('TestFrameWork.performAction', locator, action, options)
}
