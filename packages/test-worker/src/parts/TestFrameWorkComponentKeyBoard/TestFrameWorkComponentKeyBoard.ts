import * as GetKeyOptions from '../GetKeyOptions/GetKeyOptions.ts'
import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const press = async (key: string): Promise<void> => {
  const keyOptions = GetKeyOptions.getKeyOptions(key)
  const options = {
    cancelable: true,
    bubbles: true,
    ...keyOptions,
  }
  await Rpc.invoke('TestFrameWork.performKeyBoardAction', 'press', options)
}
