export const getIsFirefox = (): boolean => {
  if (typeof navigator === 'undefined') {
    return false
  }
  // @ts-expect-error
  const { userAgentData } = navigator
  if (userAgentData?.brands) {
    return userAgentData.brands.includes('Firefox')
  }
  return navigator.userAgent.toLowerCase().includes('firefox')
}
