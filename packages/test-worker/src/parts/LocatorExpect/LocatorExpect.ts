export interface LocatorExpect {
  /**
   * @internal
   */
  negated: boolean
  /**
   * @internal
   */
  readonly checkSingleElementCondition: (fnName: string, options?: any) => Promise<void>
  /**
   * @internal
   */
  readonly checkMultiElementCondition: (fnName: string, options: any) => Promise<void>
  readonly toBeVisible: () => Promise<void>
  readonly toHaveText: (text: string) => Promise<void>
  readonly toContainText: (text: string) => Promise<void>
  readonly toHaveValue: (value: string) => Promise<void>
  readonly toBeFocused: () => Promise<void>
  readonly toHaveCSS: (key: string, value: string) => Promise<void>
  readonly toHaveAttribute: (key: string, value: string) => Promise<void>
  readonly toHaveJSProperty: (key: string, value: any) => Promise<void>
  readonly toHaveClass: (className: string) => Promise<void>
  readonly toHaveId: (id: string) => Promise<void>
  readonly toHaveCount: (count: number) => Promise<void>
  readonly toBeHidden: () => Promise<void>
  readonly not: LocatorExpect
}
