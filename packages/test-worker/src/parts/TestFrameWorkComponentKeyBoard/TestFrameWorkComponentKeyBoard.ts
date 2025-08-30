import * as GetKeyOptions from '../GetKeyOptions/GetKeyOptions.ts'
import { RendererWorker as Rpc } from '@lvce-editor/rpc-registry'

export const press = async (key: string): Promise<void> => {
  const keyOptions = GetKeyOptions.getKeyOptions(key)
  const options = {
    cancelable: true,
    bubbles: true,
    ...keyOptions,
  }
  // @ts-ignore
  await Rpc.invoke('TestFrameWork.performKeyBoardAction', 'press', options)
}
