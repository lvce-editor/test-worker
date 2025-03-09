import { join } from 'node:path'
import { root } from './root.ts'

export const threshold = 450_000

export const instantiations = 700

export const instantiationsPath = join(root, 'packages', 'test-worker')

export const workerPath = join(root, 'dist/dist/testWorkerMain.js')

export const playwrightPath = new URL('../../e2e/node_modules/playwright/index.mjs', import.meta.url).toString()
