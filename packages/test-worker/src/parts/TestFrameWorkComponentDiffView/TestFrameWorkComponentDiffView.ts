import * as Main from '../TestFrameWorkComponentMain/TestFrameWorkComponentMain.ts'

export const open = async (leftUri: string, rightUri: string): Promise<void> => {
  await Main.openUri(`diff://${leftUri}<->${rightUri}`)
}
