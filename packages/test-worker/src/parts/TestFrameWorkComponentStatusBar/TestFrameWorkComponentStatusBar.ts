import * as DirectViewWorker from '../DirectViewWorker/DirectViewWorker.ts'

export const update = async (): Promise<void> => {
  await DirectViewWorker.invoke('StatusBar', 'StatusBar.updateStatusBarItems')
}
