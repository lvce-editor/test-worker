import * as GetKeyOptions from '../GetKeyOptions/GetKeyOptions.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

export const press = async (key: string): Promise<void> => {
  const keyOptions = GetKeyOptions.getKeyOptions(key)
  const options = {
    bubbles: true,
    cancelable: true,
    ...keyOptions,
  }

  await RendererProcess.invoke('TestFrameWork.performKeyBoardAction', 'press', options)
}
