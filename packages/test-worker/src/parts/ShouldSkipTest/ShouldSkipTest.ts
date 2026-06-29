import * as GetBrowserName from '../GetBrowserName/GetBrowserName.ts'

export const shouldSkipTestWithBrowserName = (skip: unknown, browserName: GetBrowserName.BrowserName): boolean => {
  if (Array.isArray(skip)) {
    return skip.includes(browserName)
  }
  return Boolean(skip)
}

export const shouldSkipTest = (skip: unknown): boolean => {
  const browserName = GetBrowserName.getBrowserName()
  return shouldSkipTestWithBrowserName(skip, browserName)
}
