import * as AutoFixState from '../AutoFixState/AutoFixState.ts'
import { createUrlWithQueryParameter } from '../CreateUrlWithQueryParameter/CreateUrlWithQueryParameter.ts'
import * as ExecuteTest from '../Test/Test.ts'
import * as FileSystem from '../TestFrameWorkComponentFileSystem/TestFrameWorkComponentFileSystem.ts'
import * as TestInfo from '../TestInfoCache/TestInfoCache.ts'
import { isAutoFixError } from '../TryAutoFixIsAutoFixError/TryAutoFixIsAutoFixError.ts'
import { replaceShouldHavePayload } from '../TryAutoFixReplaceShouldHavePayload/TryAutoFixReplaceShouldHavePayload.ts'
import { toFileUrl } from '../TryAutoFixToFileUrl/TryAutoFixToFileUrl.ts'

export const tryAutoFixWith = async (): Promise<void> => {
  const latestTestInfo = TestInfo.maybeLast()
  if (!latestTestInfo) {
    return
  }
  if (latestTestInfo.inProgress) {
    return
  }
  const autoFixError = AutoFixState.get()
  if (!isAutoFixError(autoFixError)) {
    return
  }
  if (autoFixError.actualPayload === undefined) {
    return
  }
  const fileUrl = toFileUrl(latestTestInfo.url, location.href)
  if (!fileUrl) {
    return
  }
  const fileContent = await FileSystem.readFile(fileUrl)
  const updatedFileContent = replaceShouldHavePayload(fileContent, autoFixError.expectedPayload, autoFixError.actualPayload)
  if (!updatedFileContent || updatedFileContent === fileContent) {
    return
  }
  await FileSystem.writeFile(fileUrl, updatedFileContent)
  AutoFixState.set(undefined)
  const rerunUrl = createUrlWithQueryParameter(latestTestInfo.url, location.href, Date.now())
  await ExecuteTest.execute(rerunUrl, latestTestInfo.platform, latestTestInfo.assetDir)
}
