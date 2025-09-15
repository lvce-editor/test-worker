export interface ExecuteTestResult {
  readonly background: string
  readonly duration: number
  readonly end: number
  readonly error: any
  readonly formattedDuration: string
  readonly name: string
  readonly start: number
  readonly text: string
  readonly type: string
}
