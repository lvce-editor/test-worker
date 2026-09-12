export interface ConfirmMock extends AsyncDisposable {
  shouldHaveBeenCalledWith(expectedMessage: string): Promise<void>
}
