import { expect, test } from '@jest/globals'
import * as CreateApi from '../src/parts/CreateApi/CreateApi.js'

test('createApi function exists and is exported', () => {
  expect(CreateApi.createApi).toBeDefined()
  expect(typeof CreateApi.createApi).toBe('function')
})

test('createApi returns Api object with correct structure', () => {
  const platform = 1
  const assetDir = '/test/assets'

  const api = CreateApi.createApi(platform, assetDir)

  // Test that it returns an object
  expect(typeof api).toBe('object')
  expect(api).not.toBeNull()
})

test('createApi includes all expected components', () => {
  const platform = 1
  const assetDir = '/test/assets'

  const api = CreateApi.createApi(platform, assetDir)

  // Test for key components that should be included
  expect(api.About).toBeDefined()
  expect(api.ActivityBar).toBeDefined()
  expect(api.Audio).toBeDefined()
  expect(api.ClipBoard).toBeDefined()
  expect(api.Command).toBeDefined()
  expect(api.ContextMenu).toBeDefined()
  expect(api.Developer).toBeDefined()
  expect(api.Dialog).toBeDefined()
  expect(api.Editor).toBeDefined()
  expect(api.Explorer).toBeDefined()
  expect(api.Extension).toBeDefined()
  expect(api.FileSystem).toBeDefined()
  expect(api.FindWidget).toBeDefined()
  expect(api.Main).toBeDefined()
  expect(api.Output).toBeDefined()
  expect(api.Panel).toBeDefined()
  expect(api.Problems).toBeDefined()
  expect(api.QuickPick).toBeDefined()
  expect(api.References).toBeDefined()
  expect(api.RunAndDebug).toBeDefined()
  expect(api.Search).toBeDefined()
  expect(api.Settings).toBeDefined()
  expect(api.StatusBar).toBeDefined()
  expect(api.test).toBeDefined()
  expect(api.expect).toBeDefined()
  expect(api.Locator).toBeDefined()
})

test('createApi includes BaseUrl with correct implementation', () => {
  const platform = 1
  const assetDir = '/test/assets'

  const api = CreateApi.createApi(platform, assetDir)

  expect(api.BaseUrl).toBeDefined()
  expect(typeof api.BaseUrl.getBaseUrl).toBe('function')
  expect(api.BaseUrl.getBaseUrl()).toBe(assetDir)
})

test('createApi includes FileSystem with loadFixture method', () => {
  const platform = 1
  const assetDir = '/test/assets'

  const api = CreateApi.createApi(platform, assetDir)

  expect(api.FileSystem).toBeDefined()
  expect(typeof api.FileSystem.loadFixture).toBe('function')
})

test('createApi includes getTmpDir function', () => {
  const platform = 1
  const assetDir = '/test/assets'

  const api = CreateApi.createApi(platform, assetDir)

  expect(api.getTmpDir).toBeDefined()
  expect(typeof api.getTmpDir).toBe('function')
})

test('createApi works with different platform values', () => {
  const assetDir = '/test/assets'
  const platforms = [0, 1, 2, 3]

  for (const platform of platforms) {
    const api = CreateApi.createApi(platform, assetDir)
    expect(typeof api).toBe('object')
    expect(api).not.toBeNull()
  }
})

test('createApi works with different assetDir values', () => {
  const platform = 1
  const assetDirs = ['/assets', './assets', '/path/to/assets', '']

  for (const assetDir of assetDirs) {
    const api = CreateApi.createApi(platform, assetDir)
    expect(typeof api).toBe('object')
    expect(api.BaseUrl.getBaseUrl()).toBe(assetDir)
  }
})
