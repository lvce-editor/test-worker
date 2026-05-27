import { expect, test } from '@jest/globals'
import { replaceShouldHavePayload } from '../src/parts/TryAutoFixReplaceShouldHavePayload/TryAutoFixReplaceShouldHavePayload.ts'

test('replaceShouldHavePayload returns undefined when the projected payload cannot be serialized', () => {
  const fileContent = `
export const test = async ({ ChatDebug }) => {
  await ChatDebug.shouldHavePayload({
    value: 1,
  })
}
`

  expect(replaceShouldHavePayload(fileContent, { value: 1 }, 1n)).toBeUndefined()
})

test('replaceShouldHavePayload returns undefined when no shouldHavePayload call exists', () => {
  const fileContent = `
export const test = async ({ ChatDebug }) => {
  await ChatDebug.log({
    value: 1,
  })
}
`

  expect(replaceShouldHavePayload(fileContent, { value: 1 }, { value: 2 })).toBeUndefined()
})

test('replaceShouldHavePayload returns undefined when multiple matches exist and expected payload cannot be serialized', () => {
  const fileContent = `
export const test = async ({ ChatDebug }) => {
  await ChatDebug.shouldHavePayload({
    id: 'first',
  })
  await ChatDebug.shouldHavePayload({
    id: 'second',
  })
}
`

  expect(replaceShouldHavePayload(fileContent, 1n, { id: 'updated' })).toBeUndefined()
})
