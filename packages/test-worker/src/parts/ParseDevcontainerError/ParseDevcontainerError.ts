import { DockerNotInstalledError } from '../DockerNotInstalledError/DockerNotInstalledError.ts'

const lineBreak = /\r?\n/

const getProperty = (value: unknown, property: string): unknown => {
  if (!value || typeof value !== 'object') {
    return undefined
  }
  return (value as Record<string, unknown>)[property]
}

const parseJson = (value: unknown): unknown => {
  if (typeof value !== 'string') {
    return value
  }
  const trimmed = value.trim()
  for (let index = trimmed.lastIndexOf('{'); index >= 0; index = index === 0 ? -1 : trimmed.lastIndexOf('{', index - 1)) {
    try {
      return JSON.parse(trimmed.slice(index))
    } catch {
      // CLI log lines may precede the final JSON result.
    }
  }
  return undefined
}

export const parseDevcontainerError = (errorResult: unknown, dockerPath = 'docker'): Error => {
  const value = typeof errorResult === 'string' ? parseJson(errorResult) : errorResult
  const result = getProperty(value, 'lastResult') ?? value
  const json = getProperty(result, 'json') ?? parseJson(getProperty(result, 'stdout'))
  const cliMessage = getProperty(json, 'message')
  const errorMessage = getProperty(result, 'errorMessage')
  const stderr = getProperty(result, 'stderr')
  const errorCode = getProperty(result, 'errorCode')
  const missingDocker = `spawn ${dockerPath} ENOENT`
  if (
    errorCode === 'E_DOCKER_NOT_INSTALLED' ||
    cliMessage === missingDocker ||
    errorMessage === missingDocker ||
    (typeof stderr === 'string' && stderr.split(lineBreak).includes(`Error: ${missingDocker}`))
  ) {
    return new DockerNotInstalledError(errorResult)
  }
  const message = [cliMessage, errorMessage, stderr].find((value): value is string => typeof value === 'string' && value.trim().length > 0)
  return new Error(`Devcontainer failed: ${message || 'Unknown error'}`, { cause: errorResult })
}
