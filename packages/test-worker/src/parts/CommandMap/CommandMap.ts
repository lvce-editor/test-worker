import { handleFileWatcherEvent } from '../HandleFileWatcherEvent/HandleFileWatcherEvent.ts'
import * as Test from '../Test/Test.ts'
import * as TestFrameWorkComponentDialog from '../TestFrameWorkComponentDialog/TestFrameWorkComponentDialog.ts'

export const commandMap = {
  'FileWatcher.handleEvent': handleFileWatcherEvent,
  'Test.execute': Test.execute,
  'Test.executeMock': TestFrameWorkComponentDialog.executeMock,
}
