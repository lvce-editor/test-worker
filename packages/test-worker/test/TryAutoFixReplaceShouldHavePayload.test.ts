import { expect, test } from '@jest/globals'
import { replaceShouldHavePayload } from '../src/parts/TryAutoFixReplaceShouldHavePayload/TryAutoFixReplaceShouldHavePayload.ts'

test('replaceShouldHavePayload updates the uniquely matching payload when multiple calls exist', () => {
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

  const updated = replaceShouldHavePayload(fileContent, { id: 'second' }, { extra: true, id: 'updated' })

  expect(updated).toContain("id: 'first'")
  expect(updated).toContain("id: 'updated'")
  expect(updated).not.toContain('extra')
})

test('replaceShouldHavePayload returns undefined when multiple matching candidates exist', () => {
  const fileContent = `
export const test = async ({ ChatDebug }) => {
  await ChatDebug.shouldHavePayload({
    id: 'same',
  })
  await ChatDebug.shouldHavePayload({
    id: 'same',
  })
}
`

  const updated = replaceShouldHavePayload(fileContent, { id: 'same' }, { id: 'updated' })

  expect(updated).toBeUndefined()
})
