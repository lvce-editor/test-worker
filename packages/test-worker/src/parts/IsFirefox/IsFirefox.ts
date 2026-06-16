export const getIsFirefox = (): boolean => {
  if (typeof navigator === 'undefined') {
    return false
  }
  // @ts-expect-error
  const userAgentData = navigator.userAgentData
  if (userAgentData?.brands) {
    // @ts-expect-error
    return userAgentData.brands.includes('Firefox')
  }
  return navigator.userAgent.toLowerCase().includes('firefox')
}
