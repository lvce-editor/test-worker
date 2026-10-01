import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'randomization.uuid'

export const test: Test = async ({ Randomization }) => {
  const uuid = Randomization.getRandomUUID()
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid)) {
    throw new Error(`Expected a UUID, received ${uuid}`)
  }
}
