import { printError } from '../PrintError/PrintError.ts'
import * as ErrorWorker from '../ErrorWorker/ErrorWorker.ts'
import * as CreateErrorWorkerRpc from '../CreateErrorWorkerRpc/CreateErrorWorkerRpc.ts'

const ensureRpc = async (): Promise<void> => {
  // TODO create rpc only once
  const rpc = await CreateErrorWorkerRpc.createErrorWorkerRpc()
  ErrorWorker.set(rpc)
}

export const printTestError = async (error: any): Promise<void> => {
  await ensureRpc()
  const prettyError = await ErrorWorker.invoke('Errors.prepare', error)
  console.log({ prettyError })
  // TODO ask error worker to add codeframe
  printError(error)
}
