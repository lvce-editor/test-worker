import type { ExecuteTestResult } from '../ExecuteTestResult/ExecuteTestResult.ts'
import { callFunction } from '../CallFunction/CallFunction.ts'
import { formatDuration } from '../FormatDuration/FormatDuration.ts'
import * as TestType from '../TestType/TestType.ts'
import * as Timestamp from '../Timestamp/Timestamp.ts'

export const executeTest2 = async (name: string, fn: any, globals: any, timestampGenerator?: () => number): Promise<ExecuteTestResult> => {
  const getTimestamp = timestampGenerator ?? Timestamp.now
  const start = getTimestamp()
  const error = await callFunction(fn, globals)
  const end = getTimestamp()
  const duration = end - start
  const formattedDuration = formatDuration(duration)
  if (error) {
    return {
      error,
      start,
      end,
      duration,
      formattedDuration,
      name,
      type: TestType.Fail,
      background: 'red',
      text: `test failed: ${error}`,
    }
  }
  return {
    error: undefined,
    start,
    end,
    duration,
    formattedDuration,
    name,
    type: TestType.Pass,
    background: 'green',
    text: `test passed in ${formattedDuration}`,
  }
}
