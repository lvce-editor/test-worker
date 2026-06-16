import { ErrorWorker } from '@lvce-editor/rpc-registry'
import { printError } from '../PrintError/PrintError.ts'

const prepareError = 'Errors.prepare'
const ignoredCodeFrameStackLines = ['testWorkerMain.js', 'testWorkerMain.ts']

const formatPreparedError = (preparedError: any): string => {
  const codeFrame = preparedError.codeframe || preparedError.codeFrame
  return [preparedError.message, codeFrame, preparedError.stack].filter(Boolean).join('\n')
}

export const printTestError = async (error: any): Promise<void> => {
  try {
    const preparedError = await ErrorWorker.invoke(prepareError, error, {
      ignoredCodeFrameStackLines,
    })
    console.error(formatPreparedError(preparedError))
  } catch {
    printError(error)
  }
}
