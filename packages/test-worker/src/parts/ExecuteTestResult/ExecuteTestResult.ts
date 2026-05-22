import type { AutoFixError } from '../AutoFixError/AutoFixError.ts'
import type { OverlayAction } from '../OverlayAction/OverlayAction.ts'

export interface ExecuteTestResult {
  readonly autoFixError?: AutoFixError
  readonly background: string
  readonly duration: number
  readonly end: number
  readonly error: any
  readonly formattedDuration: string
  readonly name: string
  readonly overlayActions?: readonly OverlayAction[]
  readonly start: number
  readonly text: string
  readonly type: string
}
