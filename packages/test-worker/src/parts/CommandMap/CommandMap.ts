import { handleFileWatcherEvent } from '../HandleFileWatcherEvent/HandleFileWatcherEvent.ts'
import * as Test from '../Test/Test.ts'
import * as TestFrameWorkComponentDialog from '../TestFrameWorkComponentDialog/TestFrameWorkComponentDialog.ts'
import * as TryAutoFix from '../TryAutoFix/TryAutoFix.ts'

export const commandMap = {
  'FileWatcher.handleEvent': handleFileWatcherEvent,
  'Test.execute': Test.execute,
  'Test.executeMock': TestFrameWorkComponentDialog.executeMock,
  'Test.tryAutoFix': TryAutoFix.tryAutoFix,
}
