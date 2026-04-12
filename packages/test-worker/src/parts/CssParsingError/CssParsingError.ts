export class CssParsingError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CssParsingError'
  }
}
