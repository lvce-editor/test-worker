export type BrowserName = 'chromium' | 'firefox' | 'unknown' | 'webkit'

const includes = (userAgent: string, value: string): boolean => {
  return userAgent.includes(value)
}

export const getBrowserNameFromUserAgent = (userAgent: string): BrowserName => {
  const normalized = userAgent.toLowerCase()
  if (includes(normalized, 'firefox')) {
    return 'firefox'
  }
  if (includes(normalized, 'chrome') || includes(normalized, 'chromium') || includes(normalized, 'edg')) {
    return 'chromium'
  }
  if (includes(normalized, 'safari') || includes(normalized, 'applewebkit')) {
    return 'webkit'
  }
  return 'unknown'
}

export const getBrowserName = (): BrowserName => {
  if (typeof navigator === 'undefined') {
    return 'unknown'
  }
  return getBrowserNameFromUserAgent(navigator.userAgent)
}
