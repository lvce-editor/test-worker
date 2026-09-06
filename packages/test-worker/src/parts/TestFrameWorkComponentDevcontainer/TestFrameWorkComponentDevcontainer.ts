import { AssertionError } from '../AssertionError/AssertionError.ts'
import { parseDevcontainerError } from '../ParseDevcontainerError/ParseDevcontainerError.ts'
import { expect, Locator } from '../TestFrameWork/TestFrameWork.ts'
import { executeExtensionCommand } from '../TestFrameWorkComponentCommand/TestFrameWorkComponentCommand.ts'
import * as QuickPick from '../TestFrameWorkComponentQuickPick/TestFrameWorkComponentQuickPick.ts'

export interface DevcontainerOptions {
  readonly timeout?: number
}

export interface DevcontainerState {
  readonly containerId?: string
  readonly lastResult?: unknown
  readonly status: string
}

const getProperty = (value: unknown, property: string): unknown => {
  if (!value || typeof value !== 'object' || !(property in value)) {
    return undefined
  }
  return value[property as keyof typeof value]
}

const configuration = { dockerPath: 'docker' }

export const setDockerPath = async (path: string): Promise<void> => {
  await executeExtensionCommand('devcontainer.setDockerPath', path)
  configuration.dockerPath = path
}

const assertOk = (result: unknown): void => {
  if (getProperty(result, 'ok') !== true) {
    throw parseDevcontainerError(result, configuration.dockerPath)
  }
}

export const getState = async (): Promise<DevcontainerState> => {
  const state = await executeExtensionCommand('devcontainer.getState')
  const status = getProperty(state, 'status')
  const containerId = getProperty(state, 'containerId')
  if (typeof status !== 'string' || (containerId !== undefined && typeof containerId !== 'string')) {
    throw new AssertionError(`Invalid devcontainer state: ${JSON.stringify(state)}`)
  }
  return state as DevcontainerState
}

export type DevcontainerStatusResult =
  { readonly ok: true; readonly state: DevcontainerState } | { readonly ok: false; readonly errorResult: DevcontainerState }

export const waitForStatus = async (expectedStatus: string, timeout: number): Promise<DevcontainerStatusResult> => {
  const deadline = Date.now() + timeout
  let state: DevcontainerState | undefined
  while (Date.now() < deadline) {
    state = await getState()
    if (state.status === 'error') {
      return { errorResult: state, ok: false }
    }
    if (state.status === expectedStatus) {
      return { ok: true, state }
    }
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  throw new AssertionError(`Timed out waiting for devcontainer ${expectedStatus}: ${JSON.stringify(state)}`)
}

const selectCommand = async (label: string): Promise<void> => {
  await QuickPick.open()
  await QuickPick.setValue(`>${label}`)
  const command = Locator('.QuickPickItem', { hasText: label })
  await expect(command).toHaveCount(1)
  await QuickPick.selectItem(label)
}

export const start = async ({ timeout = 120_000 }: DevcontainerOptions = {}): Promise<void> => {
  await selectCommand('Dev Containers: Start Current Workspace')
  // Quick Pick closes before the extension command finishes.
  const result = await waitForStatus('running', timeout)
  if (!result.ok) {
    throw parseDevcontainerError(result.errorResult, configuration.dockerPath)
  }
  const { state } = result
  if (!state.containerId) {
    throw new AssertionError(`Missing devcontainer id: ${JSON.stringify(state)}`)
  }
}

export const stop = async ({ timeout = 120_000 }: DevcontainerOptions = {}): Promise<void> => {
  await selectCommand('Dev Containers: Stop Current Workspace')
  const result = await waitForStatus('stopped', timeout)
  if (!result.ok) {
    throw parseDevcontainerError(result.errorResult, configuration.dockerPath)
  }
}

export const exec = async (command: string, args: readonly string[] = []): Promise<string> => {
  const result = await executeExtensionCommand('devcontainer.exec', command, args)
  assertOk(result)
  const stdout = getProperty(result, 'stdout')
  if (typeof stdout !== 'string') {
    throw new AssertionError(`Missing devcontainer stdout: ${JSON.stringify(result)}`)
  }
  return stdout
}

export const shouldHaveExecOutput = async (command: string, args: readonly string[], expected: string | RegExp): Promise<void> => {
  const stdout = await exec(command, args)
  const matches = typeof expected === 'string' ? stdout === expected : new RegExp(expected).test(stdout)
  if (!matches) {
    throw new AssertionError(`Expected devcontainer output ${expected}, received ${JSON.stringify(stdout)}`)
  }
}

export const shouldFailToExec = async (command: string, args: readonly string[], errorCode: string): Promise<void> => {
  const result = await executeExtensionCommand('devcontainer.exec', command, args)
  if (getProperty(result, 'ok') !== false || getProperty(result, 'errorCode') !== errorCode) {
    throw new AssertionError(`Expected devcontainer execution to fail with ${errorCode}, received ${JSON.stringify(result)}`)
  }
}

export const remove = async (): Promise<void> => {
  const state = await getState()
  if (state.containerId) {
    assertOk(await executeExtensionCommand('devcontainer.remove'))
  }
}
