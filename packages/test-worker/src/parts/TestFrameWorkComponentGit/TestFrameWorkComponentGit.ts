import { RendererWorker } from '@lvce-editor/rpc-registry'

export const init = async (): Promise<void> => {
  // await RendererWorker.invoke('ExtensionHostManagement.activateByEvent', 'onSourceControl:')
  await RendererWorker.invoke('ExtensionHost.executeCommand', 'git.init')
}

export const clone = async (repositoryUrl: string, cwd: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionHost.executeCommand', 'Git.clone', repositoryUrl, cwd)
}

export const add = async (pathSpec: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionHost.executeCommand', 'Git.add', pathSpec)
}

export const commit = async (message: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionHost.executeCommand', 'Git.commit', message)
}

export const push = async (remote: string, branch: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionHost.executeCommand', 'Git.push', remote, branch)
}

export const pull = async (remote: string, branch: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionHost.executeCommand', 'Git.pull', remote, branch)
}

export const fetch = async (remote: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionHost.executeCommand', 'Git.fetch', remote)
}

export const checkout = async (ref: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionHost.executeCommand', 'Git.checkout', ref)
}

export const branch = async (name: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionHost.executeCommand', 'Git.branch', name)
}

export const status = async (): Promise<unknown> => {
  return RendererWorker.invoke('ExtensionHost.executeCommand', 'Git.status')
}

export const addRemote = async (name: string, remoteUrl: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionHost.executeCommand', 'Git.addRemote', name, remoteUrl)
}

export const setConfig = async (key: string, value: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionHost.executeCommand', 'Git.setConfig', key, value)
}

interface GitInvocation {
  readonly command: readonly string[]
  readonly cwd: string
}

export const shouldHaveInvocations = async (invocations: readonly GitInvocation[]): Promise<void> => {
  // TODO
}
