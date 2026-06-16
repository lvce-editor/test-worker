import { ErrorWorker } from '@lvce-editor/rpc-registry'
import { printError } from '../PrintError/PrintError.ts'

const prepareError = 'Errors.prepare'

const formatPreparedError = (preparedError: any): string => {
  const codeFrame = preparedError.codeframe || preparedError.codeFrame
  return [preparedError.message, codeFrame, preparedError.stack].filter(Boolean).join('\n')
}

export const printTestError = async (error: any): Promise<void> => {
  try {
    const preparedError = await ErrorWorker.invoke(prepareError, error)
    const formatted = formatPreparedError(preparedError)
    console.error(formatted)
  } catch {
    printError(error)
  }
}
