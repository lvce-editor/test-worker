import { expect, test } from '@jest/globals'
import { DragAndDrop } from '../src/parts/TestFrameWorkComponent/TestFrameWorkComponent.ts'

test('exports the drag and drop test component', () => {
  expect(DragAndDrop.createDropSession).toBeDefined()
})
