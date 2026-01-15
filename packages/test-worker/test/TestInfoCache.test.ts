import { expect, test, beforeEach } from '@jest/globals'
import * as TestInfoCache from '../src/parts/TestInfoCache/TestInfoCache.js'

beforeEach(() => {
  TestInfoCache.clear()
})

test('hasItems returns false when no items exist', () => {
  expect(TestInfoCache.hasItems()).toBe(false)
})

test('hasItems returns true when items exist', () => {
  const testItem: TestInfoCache.TestInfoItem = {
    assetDir: '/test/assets',
    inProgress: false,
    platform: 1,
    url: 'http://localhost:3000',
  }
  TestInfoCache.push(testItem)
  expect(TestInfoCache.hasItems()).toBe(true)
})

test('push adds an item to the cache', () => {
  const testItem: TestInfoCache.TestInfoItem = {
    assetDir: '/test/assets',
    inProgress: false,
    platform: 1,
    url: 'http://localhost:3000',
  }

  expect(TestInfoCache.hasItems()).toBe(false)
  TestInfoCache.push(testItem)
  expect(TestInfoCache.hasItems()).toBe(true)
})

test('push adds multiple items to the cache', () => {
  const testItem1: TestInfoCache.TestInfoItem = {
    assetDir: '/test/assets1',
    inProgress: false,
    platform: 1,
    url: 'http://localhost:3000',
  }

  const testItem2: TestInfoCache.TestInfoItem = {
    assetDir: '/test/assets2',
    inProgress: true,
    platform: 2,
    url: 'http://localhost:3001',
  }

  TestInfoCache.push(testItem1)
  TestInfoCache.push(testItem2)

  expect(TestInfoCache.hasItems()).toBe(true)
  expect(TestInfoCache.last()).toEqual(testItem2)
})

test('last returns the last added item', () => {
  const testItem1: TestInfoCache.TestInfoItem = {
    assetDir: '/test/assets1',
    inProgress: false,
    platform: 1,
    url: 'http://localhost:3000',
  }

  const testItem2: TestInfoCache.TestInfoItem = {
    assetDir: '/test/assets2',
    inProgress: true,
    platform: 2,
    url: 'http://localhost:3001',
  }

  TestInfoCache.push(testItem1)
  TestInfoCache.push(testItem2)

  expect(TestInfoCache.last()).toEqual(testItem2)
})

test('last returns the only item when only one exists', () => {
  const testItem: TestInfoCache.TestInfoItem = {
    assetDir: '/test/assets',
    inProgress: false,
    platform: 1,
    url: 'http://localhost:3000',
  }

  TestInfoCache.push(testItem)
  expect(TestInfoCache.last()).toEqual(testItem)
})

test('last throws an error when no items exist', () => {
  expect(() => TestInfoCache.last()).toThrow('no item found')
})

test('clear removes all items', () => {
  const testItem1: TestInfoCache.TestInfoItem = {
    assetDir: '/test/assets1',
    inProgress: false,
    platform: 1,
    url: 'http://localhost:3000',
  }

  const testItem2: TestInfoCache.TestInfoItem = {
    assetDir: '/test/assets2',
    inProgress: true,
    platform: 2,
    url: 'http://localhost:3001',
  }

  // Add items
  TestInfoCache.push(testItem1)
  TestInfoCache.push(testItem2)
  expect(TestInfoCache.hasItems()).toBe(true)
  expect(TestInfoCache.last()).toEqual(testItem2)

  // Clear items
  TestInfoCache.clear()
  expect(TestInfoCache.hasItems()).toBe(false)
  expect(() => TestInfoCache.last()).toThrow('no item found')
})
