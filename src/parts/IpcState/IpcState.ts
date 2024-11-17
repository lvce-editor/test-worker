const state = {
  /**
   * @type {any}
   */
  ipc: undefined,
}

export const getIpc = (): any | null => {
  return state.ipc
}

export const setIpc = (ipc: any): void => {
  state.ipc = ipc
}
