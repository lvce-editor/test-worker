import { createLocator } from '../CreateLocator/CreateLocator.ts'
import * as DirectViewWorker from '../DirectViewWorker/DirectViewWorker.ts'
import { expect } from '../Expect/Expect.ts'
import * as Main from '../TestFrameWorkComponentMain/TestFrameWorkComponentMain.ts'

export type DiffMode = 'inline' | 'side-by-side'

export type DiffLayout = 'horizontal' | 'vertical'

export const open = async (leftUri: string, rightUri: string): Promise<void> => {
  await Main.openUri(`diff://${leftUri}<->${rightUri}`)
}

export const shouldHaveContentLeft = async (expectedContent: string): Promise<void> => {
  const contentLeft = createLocator('.DiffEditorContentLeft')
  await expect(contentLeft).toHaveText(expectedContent)
}

export const shouldHaveContentRight = async (expectedContent: string): Promise<void> => {
  const contentRight = createLocator('.DiffEditorContentRight')
  await expect(contentRight).toHaveText(expectedContent)
}

export const setDiffMode = async (diffMode: DiffMode): Promise<void> => {
  await DirectViewWorker.invoke('DiffView', 'DiffView.setDiffMode', diffMode)
}

export const toggleDiffMode = async (): Promise<void> => {
  await DirectViewWorker.invoke('DiffView', 'DiffView.toggleDiffMode')
}

export const setLayout = async (layout: DiffLayout): Promise<void> => {
  await DirectViewWorker.invoke('DiffView', 'DiffView.setLayout', layout)
}

export const setFontFamily = async (fontFamily: string): Promise<void> => {
  await DirectViewWorker.invoke('DiffView', 'DiffView.setFontFamily', fontFamily)
}

export const setWordWrap = async (enabled: boolean): Promise<void> => {
  await DirectViewWorker.invoke('DiffView', 'DiffView.setWordWrap', enabled)
}

export const toggleWhitespace = async (): Promise<void> => {
  await DirectViewWorker.invoke('DiffView', 'DiffView.toggleWhitespace')
}

export const handleWheel = async (deltaMode: number, deltaY: number): Promise<void> => {
  await DirectViewWorker.invoke('DiffView', 'DiffView.handleWheel', deltaMode, deltaY)
}

export const handleResize = async (width: number, height: number): Promise<void> => {
  await DirectViewWorker.invoke('DiffView', 'DiffView.handleResize', width, height)
}

export const handleWorkspaceChange = async (): Promise<void> => {
  await DirectViewWorker.invoke('DiffView', 'DiffView.handleWorkspaceChange')
}

export const handleClickAt = async (clientX: number, clientY: number, targetName: string): Promise<void> => {
  await DirectViewWorker.invoke('DiffView', 'DiffView.handleClickAt', clientX, clientY, targetName)
}

export const handleSashPointerDown = async (clientX: number, clientY: number): Promise<void> => {
  await DirectViewWorker.invoke('DiffView', 'DiffView.handleSashPointerDown', clientX, clientY)
}

export const handleSashPointerMove = async (clientX: number, clientY: number): Promise<void> => {
  await DirectViewWorker.invoke('DiffView', 'DiffView.handleSashPointerMove', clientX, clientY)
}

export const handleSashPointerUp = async (clientX: number, clientY: number): Promise<void> => {
  await DirectViewWorker.invoke('DiffView', 'DiffView.handleSashPointerUp', clientX, clientY)
}

export const handleScrollBarPointerDown = async (clientY: number): Promise<void> => {
  await DirectViewWorker.invoke('DiffView', 'DiffView.handleScrollBarPointerDown', clientY)
}

export const handleScrollBarPointerMove = async (clientY: number): Promise<void> => {
  await DirectViewWorker.invoke('DiffView', 'DiffView.handleScrollBarPointerMove', clientY)
}

export const handleScrollBarPointerUp = async (clientY: number): Promise<void> => {
  await DirectViewWorker.invoke('DiffView', 'DiffView.handleScrollBarPointerUp', clientY)
}

export const setCursorPosition = async (rowIndex: number, columnIndex: number): Promise<void> => {
  await DirectViewWorker.invoke('DiffView', 'DiffView.setCursorPosition', rowIndex, columnIndex)
}

export const handleInput = async (text: string): Promise<void> => {
  await DirectViewWorker.invoke('DiffView', 'DiffView.handleInput', text)
}
