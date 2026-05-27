import { RendererWorker } from '@lvce-editor/rpc-registry'

export const init = async (): Promise<void> => {
  await RendererWorker.invoke('Git.init')
}

export const clone = async (repositoryUrl: string, cwd: string): Promise<void> => {
  await RendererWorker.invoke('Git.clone', repositoryUrl, cwd)
}

export const add = async (pathSpec: string): Promise<void> => {
  await RendererWorker.invoke('Git.add', pathSpec)
}

export const commit = async (message: string): Promise<void> => {
  await RendererWorker.invoke('Git.commit', message)
}

export const push = async (remote: string, branch: string): Promise<void> => {
  await RendererWorker.invoke('Git.push', remote, branch)
}

export const pull = async (remote: string, branch: string): Promise<void> => {
  await RendererWorker.invoke('Git.pull', remote, branch)
}

export const fetch = async (remote: string): Promise<void> => {
  await RendererWorker.invoke('Git.fetch', remote)
}

export const checkout = async (ref: string): Promise<void> => {
  await RendererWorker.invoke('Git.checkout', ref)
}

export const branch = async (name: string): Promise<void> => {
  await RendererWorker.invoke('Git.branch', name)
}

export const status = async (): Promise<unknown> => {
  return RendererWorker.invoke('Git.status')
}

export const addRemote = async (name: string, remoteUrl: string): Promise<void> => {
  await RendererWorker.invoke('Git.addRemote', name, remoteUrl)
}

export const setConfig = async (key: string, value: string): Promise<void> => {
  await RendererWorker.invoke('Git.setConfig', key, value)
}

export const shouldHaveInvocations = async (invocations: readonly unknown[][]): Promise<void> => {
  // TODO
}
