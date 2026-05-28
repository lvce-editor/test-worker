import { executeExtensionCommand } from '../ExecuteExtensionCommand/ExecuteExtensionCommand.ts'

interface GitInitOptions {
  readonly bare?: boolean
  readonly initialBranch?: string
  readonly uri?: string
}

interface GitPushOptions {
  readonly setUpstream?: readonly string[]
}

export const init = async (options: GitInitOptions = {}): Promise<void> => {
  await executeExtensionCommand('git.init', options)
}

export const clone = async (repositoryUrl: string, cwd: string): Promise<void> => {
  await executeExtensionCommand('git.clone', repositoryUrl, cwd)
}

export const add = async (pathSpec: string): Promise<void> => {
  await executeExtensionCommand('git.add', pathSpec)
}

export const commit = async (message: string): Promise<void> => {
  await executeExtensionCommand('git.commit', message)
}

export const push = async (remoteOrOptions?: string | GitPushOptions, branch?: string): Promise<void> => {
  if (typeof remoteOrOptions === 'string') {
    await executeExtensionCommand('git.push', {
      setUpstream: [remoteOrOptions, branch || ''],
    })
    return
  }
  await executeExtensionCommand('git.push', remoteOrOptions || {})
}

export const pull = async (remote: string, branch: string): Promise<void> => {
  await executeExtensionCommand('git.pull', remote, branch)
}

export const fetch = async (remote: string): Promise<void> => {
  await executeExtensionCommand('git.fetch', remote)
}

export const fetchAll = async (): Promise<void> => {
  await executeExtensionCommand('git.fetchAll')
}

export const fetchPrune = async (): Promise<void> => {
  await executeExtensionCommand('git.fetchPrune')
}

export const stash = async (message?: string): Promise<void> => {
  if (message === undefined) {
    await executeExtensionCommand('git.stash')
    return
  }
  await executeExtensionCommand('git.stash', message)
}

export const unstash = async (): Promise<void> => {
  await executeExtensionCommand('git.unstash')
}

export const checkout = async (ref: string): Promise<void> => {
  await executeExtensionCommand('git.checkout', ref)
}

export const branch = async (name: string): Promise<void> => {
  await executeExtensionCommand('git.branch', name)
}

export const deleteBranch = async (name: string): Promise<void> => {
  await executeExtensionCommand('git.deleteBranch', name)
}

export const renameBranch = async (newName: string): Promise<void> => {
  await executeExtensionCommand('git.renameBranch', newName)
}

export const cherryPick = async (commitHash: string): Promise<void> => {
  await executeExtensionCommand('git.cherryPick', commitHash)
}

export const merge = async (ref: string): Promise<void> => {
  await executeExtensionCommand('git.merge', ref)
}

export const rebase = async (ref: string): Promise<void> => {
  await executeExtensionCommand('git.rebase', ref)
}

export const createTag = async (name: string): Promise<void> => {
  await executeExtensionCommand('git.createTag', name)
}

export const deleteTag = async (name: string): Promise<void> => {
  await executeExtensionCommand('git.deleteTag', name)
}

export const status = async (): Promise<unknown> => {
  return executeExtensionCommand('git.status')
}

export const addRemote = async (name: string, remoteUrl: string): Promise<void> => {
  await executeExtensionCommand('git.addRemote', name, remoteUrl)
}

export const setOrigin = async (remoteUrl: string): Promise<void> => {
  await addRemote('origin', remoteUrl)
}

export const setUpstream = async (remoteUrl: string): Promise<void> => {
  await addRemote('upstream', remoteUrl)
}

export const removeRemote = async (name: string): Promise<void> => {
  await executeExtensionCommand('git.removeRemote', name)
}

export const removeOrigin = async (): Promise<void> => {
  await removeRemote('origin')
}

export const removeUpstream = async (): Promise<void> => {
  await removeRemote('upstream')
}

export const setConfig = async (key: string, value: string): Promise<void> => {
  await executeExtensionCommand('git.setConfig', key, value)
}

export const config = async (values: Record<string, string>): Promise<void> => {
  for (const [key, value] of Object.entries(values)) {
    await setConfig(key, value)
  }
}

export const shouldHaveCommit = async (message: string): Promise<void> => {
  const commits = await executeExtensionCommand('git.getCommits')
  if (!Array.isArray(commits)) {
    throw new TypeError(`Expected commits to be an array, but got ${commits}`)
  }
  if (commits.length !== 1) {
    throw new Error(`Expected 1 commit, but got ${commits.length}`)
  }
  if (!commits[0].hash) {
    throw new Error('Expected commit hash to be defined')
  }
  if (commits[0].message !== message) {
    throw new Error(`Expected commit message to be "${message}", but got "${commits[0].message}"`)
  }
}

interface GitInvocation {
  readonly command: readonly string[]
  readonly cwd: string
}

export const shouldHaveInvocations = async (invocations: readonly GitInvocation[]): Promise<void> => {
  // TODO
}
