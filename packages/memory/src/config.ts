import { join } from 'node:path'
import { root } from './root.ts'

export const threshold = 756_000

export const instantiations = 181_000

export const instantiationsPath = join(root, 'packages', 'test-worker')

export const workerPath = join(root, '.tmp/dist/dist/testWorkerMain.js')

export const playwrightPath = new URL('../../../node_modules/playwright/index.mjs', import.meta.url).toString()
