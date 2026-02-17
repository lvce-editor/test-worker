import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Audio from '../src/parts/TestFrameWorkComponentAudio/TestFrameWorkComponentAudio.ts'

test('load', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Audio.load'() {
      return undefined
    },
  })

  await Audio.load('https://example.com/sound.opus')

  expect(mockRpc.invocations).toEqual([['Audio.load', 'https://example.com/sound.opus']])
})

test('play', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Audio.play'() {
      return undefined
    },
  })

  await Audio.play('https://example.com/sound.mp3')

  expect(mockRpc.invocations).toEqual([['Audio.play', 'https://example.com/sound.mp3']])
})

test('pause', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Audio.pause'() {
      return undefined
    },
  })

  await Audio.pause()

  expect(mockRpc.invocations).toEqual([['Audio.pause']])
})
