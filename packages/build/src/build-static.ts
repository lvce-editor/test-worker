import { cp } from 'node:fs/promises'
import { join } from 'node:path'
import { exportStatic } from '@lvce-editor/shared-process'
import { root } from './root.ts'

process.env.PATH_PREFIX = '/test-worker'
const { commitHash } = await exportStatic({
  root,
  extensionPath: '',
  testPath: 'packages/e2e',
})

await cp(
  join(root, '.tmp', 'dist', 'dist', 'testWorkerMain.js'),
  join(root, 'dist', commitHash, 'packages', 'test-worker', 'dist', 'testWorkerMain.js'),
)

await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
