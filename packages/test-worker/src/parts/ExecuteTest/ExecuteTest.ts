import * as AutoFixState from '../AutoFixState/AutoFixState.ts'
import { executeTest2 } from '../ExecuteTest2/ExecuteTest2.ts'
import { printTestError } from '../PrintTestError/PrintTestError.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'
import * as Timestamp from '../Timestamp/Timestamp.ts'

export const executeTest = async (name: string, fn: any, globals = {}): Promise<void> => {
  const { autoFixError, background, error, formattedDuration, overlayActions, text, type } = await executeTest2(name, fn, globals, Timestamp.now)
  AutoFixState.set(autoFixError)
  if (error) {
    await printTestError(error)
  } else {
    // eslint-disable-next-line no-console
    console.info(`PASS ${name} in ${formattedDuration}`)
  }

  if (overlayActions && overlayActions.length > 0) {
    await RendererProcess.invoke('TestFrameWork.showOverlay', type, background, text, overlayActions)
    return
  }
  await RendererProcess.invoke('TestFrameWork.showOverlay', type, background, text)
}
