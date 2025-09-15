import { ExecuteTestResult } from '../ExecuteTestResult/ExecuteTestResult.ts'
import { formatDuration } from '../FormatDuration/FormatDuration.ts'
import * as Timestamp from '../Timestamp/Timestamp.ts'
import * as TestType from '../TestType/TestType.ts'
import { callFunction } from '../CallFunction/CallFunction.ts'

export const executeTest2 = async (name: string, fn: any, globals: any): Promise<ExecuteTestResult> => {
  const start = Timestamp.now()
  const error = await callFunction(fn, globals)
  const end = Timestamp.now()
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
