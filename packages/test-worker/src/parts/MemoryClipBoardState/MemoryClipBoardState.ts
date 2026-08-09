const state = {
  enabled: false,
}

export const isEnabled = (): boolean => {
  return state.enabled
}

export const setEnabled = (enabled: boolean): void => {
  state.enabled = enabled
}
