import { execute } from '../Test/Test.ts'

export const doHotReload = async (url: string, platform: number, assetDir: string): Promise<void> => {
  // eslint-disable-next-line no-console
  console.clear()
  await execute(url, platform, assetDir)
}
