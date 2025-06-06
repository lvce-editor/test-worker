import { printError } from '../PrintError/PrintError.ts'
import * as ErrorWorker from '../ErrorWorker/ErrorWorker.ts'

export const printTestError = async (error: any): Promise<void> => {
  const prettyError = await ErrorWorker.invoke('Errors.prepare', error)
  console.log({ prettyError })
  // TODO ask error worker to add codeframe
  printError(error)
}
