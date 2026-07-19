import * as Expect from '../Expect/Expect.ts'
import * as NameAnonymousFunction from '../NameAnonymousFunction/NameAnonymousFunction.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'
import * as TestState from '../TestState/TestState.ts'

export { createLocator as Locator } from '../CreateLocator/CreateLocator.ts'

export const getTmpDir = async (): Promise<string> => {
  return 'memfs://'
}

export const test = async (name: string, fn: any): Promise<void> => {
  NameAnonymousFunction.nameAnonymousFunction(fn, `test/${name}`)
  TestState.addTest(name, fn)
}

export const skipTest = async (id: string): Promise<void> => {
  const state = 'skip'
  const background = 'yellow'
  const text = `test skipped ${id}`

  await RendererProcess.invoke('TestFrameWork.showOverlay', state, background, text)
}

export const { expect } = Expect
