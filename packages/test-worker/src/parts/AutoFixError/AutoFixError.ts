export interface AutoFixError {
  readonly actualPayload: unknown
  readonly code: string
  readonly expectedPayload: unknown
}
