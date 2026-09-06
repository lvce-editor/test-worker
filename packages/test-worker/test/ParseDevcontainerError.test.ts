import { expect, test } from '@jest/globals'
import { DockerNotInstalledError } from '../src/parts/DockerNotInstalledError/DockerNotInstalledError.ts'
import { parseDevcontainerError } from '../src/parts/ParseDevcontainerError/ParseDevcontainerError.ts'

const cliError = { description: 'An error occurred setting up the container.', message: 'spawn docker ENOENT', outcome: 'error' }
const state = {
  lastResult: {
    commandName: 'DevContainerNode.cliUp',
    errorMessage: 'DevContainerNode.cliUp failed with exit code 1',
    exitCode: 1,
    ok: false,
    stderr: '[2026-09-06T12:09:36.268Z] @devcontainers/cli 0.89.0.\nError: spawn docker ENOENT\n    at ChildProcess._handle.onexit\n',
    stdout: JSON.stringify(cliError) + '\n',
  },
  status: 'error',
}

test.each([
  state,
  JSON.stringify(state),
  state.lastResult,
  { json: cliError },
  { stdout: 'log line\n' + JSON.stringify(cliError, null, 2) },
  { errorMessage: 'spawn docker ENOENT' },
  { errorCode: 'E_DOCKER_NOT_INSTALLED' },
  { stderr: 'Error: spawn docker ENOENT\r\nstack' },
])('parses missing Docker into a structured, actionable error: %p', (result) => {
  const error = parseDevcontainerError(result)
  expect(error).toBeInstanceOf(DockerNotInstalledError)
  expect(error).toMatchObject({ cause: result, code: 'E_DOCKER_NOT_INSTALLED', name: 'DockerNotInstalledError' })
  expect(String(error)).toContain('E_DOCKER_NOT_INSTALLED: Docker was not found. Install Docker')
  expect(error.message).toContain('PATH')
})

test('recognizes the configured Docker executable, including spaces', () => {
  const result = { stdout: JSON.stringify({ message: 'spawn /missing docker ENOENT' }) }
  expect(parseDevcontainerError(result, '/missing docker')).toBeInstanceOf(DockerNotInstalledError)
  expect(parseDevcontainerError(result)).not.toBeInstanceOf(DockerNotInstalledError)
})

test.each([
  [{ stdout: JSON.stringify({ message: 'Cannot connect to the Docker daemon', outcome: 'error' }) }, 'Cannot connect to the Docker daemon'],
  [{ errorMessage: 'spawn node ENOENT' }, 'spawn node ENOENT'],
  [{ errorMessage: 'spawn docker EACCES' }, 'spawn docker EACCES'],
  [{ stderr: 'Docker failed', stdout: '{invalid}' }, 'Docker failed'],
  [{ errorMessage: 'Command failed', stdout: '' }, 'Command failed'],
  [{ errorMessage: 'Command failed', stdout: JSON.stringify({ message: { nested: true } }) }, 'Command failed'],
  [{ errorMessage: 'Command failed', json: { message: '' } }, 'Command failed'],
  [{ stderr: 'Unrelated log: spawn docker ENOENT suffix' }, 'Unrelated log'],
  [undefined, 'Unknown error'],
  [null, 'Unknown error'],
  [42, 'Unknown error'],
  ['invalid', 'Unknown error'],
  [{}, 'Unknown error'],
])('preserves other failures without misclassifying them: %p', (result, message) => {
  const error = parseDevcontainerError(result)
  expect(error).not.toBeInstanceOf(DockerNotInstalledError)
  expect(error.message).toContain(message)
  expect(error.cause).toBe(result)
})
