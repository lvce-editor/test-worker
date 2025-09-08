import { createHash } from 'node:crypto'
import { readdirSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { root } from './root.ts'

const getPackageLocations = (): string[] => {
  const packageLocations: string[] = []
  const packagesFolder = join(root, 'packages')
  const dirents = readdirSync(packagesFolder)
  for (const dirent of dirents) {
    packageLocations.push(`packages/${dirent}/package-lock.json`)
  }
  packageLocations.push('package-lock.json')
  return packageLocations
}

const locations: string[] = [
  'lerna.json',
  ...getPackageLocations(),
  '.github/workflows/pr.yml',
  '.github/workflows/ci.yml',
  '.github/workflows/release.yml',
  'packages/build/src/computeNodeModulesCacheKey.ts',
  'packages/server/src/postinstall.js',
]

const packagesFolder = join(root, 'packages')

const dirents = readdirSync(packagesFolder)
for (const dirent of dirents) {
  locations.push(`packages/${dirent}/package-lock.json`)
}

const getAbsolutePath = (relativePath: string): string => {
  return join(root, relativePath)
}

const getContent = (absolutePath: string): Promise<string> => {
  return readFile(absolutePath, 'utf8')
}

export const computeHash = (contents: readonly string[] | string): string => {
  const hash = createHash('sha1')
  if (Array.isArray(contents)) {
    for (const content of contents) {
      hash.update(content)
    }
  } else if (typeof contents === 'string') {
    hash.update(contents)
  }
  return hash.digest('hex')
}

const computeCacheKey = async (locations: readonly string[]): Promise<string> => {
  const absolutePaths = locations.map(getAbsolutePath)
  const contents = await Promise.all(absolutePaths.map(getContent))
  const hash = computeHash(contents)
  return hash
}

const main = async (): Promise<void> => {
  const hash = await computeCacheKey(locations)
  process.stdout.write(hash)
}

void main()
