import { RendererWorker as Rpc } from '@lvce-editor/rpc-registry'
import * as GetKeyOptions from '../GetKeyOptions/GetKeyOptions.ts'

export const press = async (key: string): Promise<void> => {
  const keyOptions = GetKeyOptions.getKeyOptions(key)
  const options = {
    bubbles: true,
    cancelable: true,
    ...keyOptions,
  }

  await Rpc.invoke('TestFrameWork.performKeyBoardAction', 'press', options)
}
