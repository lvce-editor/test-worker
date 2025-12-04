export interface LocatorExpect {
  /**
   * @internal
   */
  readonly checkMultiElementCondition: (fnName: string, options: any) => Promise<void>
  /**
   * @internal
   */
  readonly checkSingleElementCondition: (fnName: string, options?: any) => Promise<void>
  /**
   * @internal
   */
  negated: boolean
  readonly not: LocatorExpect
  readonly toBeFocused: () => Promise<void>
  readonly toBeHidden: () => Promise<void>
  readonly toBeVisible: () => Promise<void>
  readonly toContainText: (text: string) => Promise<void>
  readonly toHaveAttribute: (key: string, value: string | null) => Promise<void>
  readonly toHaveClass: (className: string) => Promise<void>
  readonly toHaveCount: (count: number) => Promise<void>
  readonly toHaveCSS: (key: string, value: string) => Promise<void>
  readonly toHaveId: (id: string) => Promise<void>
  readonly toHaveJSProperty: (key: string, value: any) => Promise<void>
  readonly toHaveText: (text: string) => Promise<void>
  readonly toHaveValue: (value: string) => Promise<void>
}
