export interface Diagnostic {
  readonly rowIndex: number
  readonly columnIndex: number
  readonly endRowIndex: number
  readonly endColumnIndex: number
  readonly message: string
  readonly type: 'error' | 'warning'
}
