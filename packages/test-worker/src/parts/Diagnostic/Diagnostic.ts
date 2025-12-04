export interface Diagnostic {
  readonly columnIndex: number
  readonly endColumnIndex: number
  readonly endRowIndex: number
  readonly message: string
  readonly rowIndex: number
  readonly type: 'error' | 'warning'
}
