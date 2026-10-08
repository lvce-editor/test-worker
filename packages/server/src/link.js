import { cp, readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const root = join(__dirname, '..', '..', '..')

export const getRemoteUrl = (path) => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const nodeModulesPath = join(root, 'node_modules')

const workerPath = join(root, '.tmp', 'dist', 'dist', 'testWorkerMain.js')

const serverStaticPath = join(nodeModulesPath, '@lvce-editor', 'static-server', 'static')
const serverConfigPath = join(nodeModulesPath, '@lvce-editor', 'static-server', 'config.json')
const sharedProcessConfigPath = join(nodeModulesPath, '@lvce-editor', 'shared-process', 'config.json')

const RE_COMMIT_HASH = /^[a-z\d]+$/
const isCommitHash = (dirent) => {
  return dirent.length === 7 && dirent.match(RE_COMMIT_HASH)
}

await cp(serverConfigPath, sharedProcessConfigPath)

const dirents = await readdir(serverStaticPath)
const commitHash = dirents.find(isCommitHash) || ''
const rendererWorkerMainPath = join(serverStaticPath, commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')

const content = await readFile(rendererWorkerMainPath, 'utf-8')
const remoteUrl = getRemoteUrl(workerPath)
const fallback = '${assetDir}/packages/renderer-worker/node_modules/@lvce-editor/test-worker/dist/testWorkerMain.js'
if (!content.includes(fallback) && !content.includes(remoteUrl)) {
  throw new Error('test worker fallback not found')
}
await writeFile(rendererWorkerMainPath, content.replace(fallback, remoteUrl))

const indexPath = join(serverStaticPath, 'index.html')
const indexContent = await readFile(indexPath, 'utf8')
const workerUrlPattern = /("develop\.testWorkerPath":\s*)"[^"\n]+"/
if (!workerUrlPattern.test(indexContent)) {
  throw new Error('test worker configuration not found')
}
await writeFile(
  indexPath,
  indexContent.replace(workerUrlPattern, (_, key) => `${key}${JSON.stringify(remoteUrl)}`),
)
