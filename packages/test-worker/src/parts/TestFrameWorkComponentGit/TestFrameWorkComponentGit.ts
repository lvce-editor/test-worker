import { RendererWorker } from '@lvce-editor/rpc-registry'

export const init = async (): Promise<void> => {
  await RendererWorker.invoke('ExtensionHost.executeCommand', 'git.init')
}

export const clone = async (repositoryUrl: string, cwd: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionHost.executeCommand', 'git.clone', repositoryUrl, cwd)
}

export const add = async (pathSpec: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionHost.executeCommand', 'git.add', pathSpec)
}

export const commit = async (message: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionHost.executeCommand', 'git.commit', message)
}

export const push = async (remote: string, branch: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionHost.executeCommand', 'git.push', remote, branch)
}

export const pull = async (remote: string, branch: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionHost.executeCommand', 'git.pull', remote, branch)
}

export const fetch = async (remote: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionHost.executeCommand', 'git.fetch', remote)
}

export const checkout = async (ref: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionHost.executeCommand', 'git.checkout', ref)
}

export const branch = async (name: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionHost.executeCommand', 'git.branch', name)
}

export const status = async (): Promise<unknown> => {
  return RendererWorker.invoke('ExtensionHost.executeCommand', 'git.status')
}

export const addRemote = async (name: string, remoteUrl: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionHost.executeCommand', 'git.addRemote', name, remoteUrl)
}

export const setConfig = async (key: string, value: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionHost.executeCommand', 'git.setConfig', key, value)
}

interface GitInvocation {
  readonly command: readonly string[]
  readonly cwd: string
}

export const shouldHaveInvocations = async (invocations: readonly GitInvocation[]): Promise<void> => {
  // TODO
}
