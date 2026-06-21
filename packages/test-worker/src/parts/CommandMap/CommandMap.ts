import { handleFileWatcherEvent } from '../HandleFileWatcherEvent/HandleFileWatcherEvent.ts'
import * as Test from '../Test/Test.ts'
import * as TestFrameWorkComponentDialog from '../TestFrameWorkComponentDialog/TestFrameWorkComponentDialog.ts'
import * as TryAutoFix from '../TryAutoFix/TryAutoFix.ts'

export const commandMap: Record<string, any> = {
  'FileWatcher.handleEvent': handleFileWatcherEvent,
  'Test.execute': Test.execute,
  'Test.executeAll': Test.executeAll,
  'Test.executeMock': TestFrameWorkComponentDialog.executeMock,
  'Test.tryAutoFix': TryAutoFix.tryAutoFix,
}
