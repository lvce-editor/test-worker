import type { ExecuteTestResult } from '../ExecuteTestResult/ExecuteTestResult.ts'
import { callFunction } from '../CallFunction/CallFunction.ts'
import { ChatDebugShouldHavePayloadError } from '../ChatDebugShouldHavePayloadError/ChatDebugShouldHavePayloadError.ts'
import { formatDuration } from '../FormatDuration/FormatDuration.ts'
import * as TestType from '../TestType/TestType.ts'

const getAutoFixProperties = (error: any): any => {
  const isChatDebugPayloadError = error instanceof ChatDebugShouldHavePayloadError && error.actualPayload !== undefined
  const autoFixProperties = isChatDebugPayloadError
    ? {
      autoFixError: {
        actualPayload: error.actualPayload,
        code: error.code,
        expectedPayload: error.expectedPayload,
      },
      overlayActions: [
        {
          command: 'Test.tryAutoFix',
          id: 'chat-debug-should-have-payload-autofix',
          label: 'Autofix',
        },
      ],
    }
    : {}
  return autoFixProperties
}

export const executeTest2 = async (name: string, fn: any, globals: any, timestampGenerator: () => number): Promise<ExecuteTestResult> => {
  const getTimestamp = timestampGenerator
  const start = getTimestamp()
  const error = await callFunction(fn, globals)
  const end = getTimestamp()
  const duration = end - start
  const formattedDuration = formatDuration(duration)
  if (error) {
    const autoFixProperties = getAutoFixProperties(error)
    return {
      background: 'red',
      duration,
      end,
      error,
      formattedDuration,
      name,
      ...autoFixProperties,
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
