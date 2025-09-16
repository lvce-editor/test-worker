import { RendererWorker as Rpc } from '@lvce-editor/rpc-registry'
import { executeTest2 } from '../ExecuteTest2/ExecuteTest2.ts'
import { printTestError } from '../PrintTestError/PrintTestError.ts'
import * as Timestamp from '../Timestamp/Timestamp.ts'

export const executeTest = async (name: string, fn: any, globals = {}): Promise<void> => {
  const { error, formattedDuration, background, text, type } = await executeTest2(name, fn, globals, Timestamp.now)
  if (error) {
    await printTestError(error)
  } else {
    // eslint-disable-next-line no-console
    console.info(`PASS ${name} in ${formattedDuration}`)
  }
  // @ts-ignore
  await Rpc.invoke('TestFrameWork.showOverlay', type, background, text)
}
