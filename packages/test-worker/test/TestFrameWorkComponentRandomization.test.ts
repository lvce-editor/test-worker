import { expect, jest, test } from '@jest/globals'
import * as Randomization from '../src/parts/TestFrameWorkComponentRandomization/TestFrameWorkComponentRandomization.ts'

test('getRandomUUID delegates to crypto.randomUUID', () => {
  const randomUUID = jest.spyOn(crypto, 'randomUUID').mockReturnValue('00000000-0000-4000-8000-000000000000')

  try {
    expect(Randomization.getRandomUUID()).toBe('00000000-0000-4000-8000-000000000000')
    expect(randomUUID).toHaveBeenCalledTimes(1)
  } finally {
    randomUUID.mockRestore()
  }
})
