import { printError } from '../PrintError/PrintError.ts'

export const printTestError = async (error: any): Promise<void> => {
  // TODO ask error worker to add codeframe
  printError(error)
}
