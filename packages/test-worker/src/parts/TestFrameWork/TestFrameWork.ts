import * as Expect from '../Expect/Expect.ts'
import * as NameAnonymousFunction from '../NameAnonymousFunction/NameAnonymousFunction.ts'
import * as Rpc from '../RendererWorker/RendererWorker.ts'
import * as TestState from '../TestState/TestState.ts'

export { create as Locator } from '../Locator/Locator.ts'

export const getTmpDir = async (): Promise<string> => {
  return 'memfs://'
}

export const test = async (name: string, fn: any): Promise<void> => {
  NameAnonymousFunction.nameAnonymousFunction(fn, `test/${name}`)
  TestState.addTest(name, fn)
}

test.skip = async (id: string): Promise<void> => {
  const state = 'skip'
  const background = 'yellow'
  const text = `test skipped ${id}`
  await Rpc.invoke('TestFrameWork.showOverlay', state, background, text)
}

export const { expect } = Expect
