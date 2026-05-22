const defaultMessage = 'ChatDebug.shouldHavePayload assertion failed'

const getMessage = (cause: unknown): string => {
  if (!cause || typeof cause !== 'object') {
    return defaultMessage
  }
  if ('message' in cause && typeof cause.message === 'string' && cause.message) {
    return cause.message
  }
  return defaultMessage
}

export class ChatDebugShouldHavePayloadError extends Error {
  readonly actualPayload: unknown
  readonly code: 'chat-debug.should-have-payload'
  readonly expectedPayload: unknown

  constructor(expectedPayload: unknown, actualPayload: unknown, cause?: unknown) {
    super(getMessage(cause))
    this.name = 'ChatDebugShouldHavePayloadError'
    this.code = 'chat-debug.should-have-payload'
    this.expectedPayload = expectedPayload
    this.actualPayload = actualPayload
  }
}
