import type { ExecuteTestResult } from '../ExecuteTestResult/ExecuteTestResult.ts'
import { callFunction } from '../CallFunction/CallFunction.ts'
import { formatDuration } from '../FormatDuration/FormatDuration.ts'
import * as TestType from '../TestType/TestType.ts'

export const executeTest2 = async (name: string, fn: any, globals: any, timestampGenerator: () => number): Promise<ExecuteTestResult> => {
  const getTimestamp = timestampGenerator
  const start = getTimestamp()
  const error = await callFunction(fn, globals)
  const end = getTimestamp()
  const duration = end - start
  const formattedDuration = formatDuration(duration)
  if (error) {
    return {
      background: 'red',
      duration,
      end,
      error,
      formattedDuration,
      name,
      start,
      text: `test failed: ${error}`,
      type: TestType.Fail,
    }
  }
  return {
    background: 'green',
    duration,
    end,
    error: undefined,
    formattedDuration,
    name,
    start,
    text: `test passed in ${formattedDuration}`,
    type: TestType.Pass,
  }
}
