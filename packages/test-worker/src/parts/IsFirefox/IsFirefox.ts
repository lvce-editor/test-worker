export const getIsFirefox = (): boolean => {
  if (typeof navigator === 'undefined') {
    return false
  }
  if (
    // @ts-expect-error
    navigator.userAgentData?.brands
  ) {
    // @ts-expect-error
    return navigator.userAgentData.brands.includes('Firefox')
  }
  return navigator.userAgent.toLowerCase().includes('firefox')
}
