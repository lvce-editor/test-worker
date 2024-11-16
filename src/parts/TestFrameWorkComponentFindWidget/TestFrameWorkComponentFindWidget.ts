import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const focusNext = async () => {
  await Rpc.invoke('FindWidget.focusNext')
}

export const setValue = async (value: string) => {
  await Rpc.invoke('FindWidget.handleInput', value)
}
