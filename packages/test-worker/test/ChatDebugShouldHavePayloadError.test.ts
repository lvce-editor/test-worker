import { expect, test } from '@jest/globals'
import { ChatDebugShouldHavePayloadError } from '../src/parts/ChatDebugShouldHavePayloadError/ChatDebugShouldHavePayloadError.ts'

test('ChatDebugShouldHavePayloadError falls back to default message when cause message is empty', () => {
  const error = new ChatDebugShouldHavePayloadError({ expected: true }, { actual: true }, { message: '' })

  expect(error).toBeInstanceOf(ChatDebugShouldHavePayloadError)
  expect(error).toBeInstanceOf(Error)
  expect(error.message).toBe('ChatDebug.shouldHavePayload assertion failed')
  expect(error.name).toBe('ChatDebugShouldHavePayloadError')
  expect(error.code).toBe('chat-debug.should-have-payload')
  expect(error.expectedPayload).toEqual({ expected: true })
  expect(error.actualPayload).toEqual({ actual: true })
})
