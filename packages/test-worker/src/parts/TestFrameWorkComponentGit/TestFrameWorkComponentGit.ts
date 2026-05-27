import { RendererWorker } from '@lvce-editor/rpc-registry'

export const init = async (uri: string): Promise<void> => {
  await RendererWorker.invoke('Git.init', uri)
}

export const clone = async (repositoryUrl: string, cwd: string): Promise<void> => {
  await RendererWorker.invoke('Git.clone', repositoryUrl, cwd)
}

export const add = async (uri: string, pathSpec: string): Promise<void> => {
  await RendererWorker.invoke('Git.add', uri, pathSpec)
}

export const commit = async (uri: string, message: string): Promise<void> => {
  await RendererWorker.invoke('Git.commit', uri, message)
}

export const push = async (uri: string, remote: string, branch: string): Promise<void> => {
  await RendererWorker.invoke('Git.push', uri, remote, branch)
}

export const pull = async (uri: string, remote: string, branch: string): Promise<void> => {
  await RendererWorker.invoke('Git.pull', uri, remote, branch)
}

export const fetch = async (uri: string, remote: string): Promise<void> => {
  await RendererWorker.invoke('Git.fetch', uri, remote)
}

export const checkout = async (uri: string, ref: string): Promise<void> => {
  await RendererWorker.invoke('Git.checkout', uri, ref)
}

export const branch = async (uri: string, name: string): Promise<void> => {
  await RendererWorker.invoke('Git.branch', uri, name)
}

export const status = async (uri: string): Promise<any> => {
  return RendererWorker.invoke('Git.status', uri)
}

export const addRemote = async (uri: string, name: string, remoteUrl: string): Promise<void> => {
  await RendererWorker.invoke('Git.addRemote', uri, name, remoteUrl)
}

export const setConfig = async (uri: string, key: string, value: string): Promise<void> => {
  await RendererWorker.invoke('Git.setConfig', uri, key, value)
}
