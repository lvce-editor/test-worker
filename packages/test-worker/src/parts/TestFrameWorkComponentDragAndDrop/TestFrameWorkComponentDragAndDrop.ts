import { RendererWorker } from '@lvce-editor/rpc-registry'
import { AssertionError } from '../AssertionError/AssertionError.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

interface DropSessionStringItem {
  readonly kind: 'string'
  readonly type: string
  readonly value: string
}

interface DropSessionFileItem {
  readonly file?: File
  readonly fileSystemHandle?: FileSystemHandle
  readonly kind: 'file'
  readonly type: string
}

export type DropSessionItem = DropSessionFileItem | DropSessionStringItem

export const createDropSession = (items: readonly DropSessionItem[]): Promise<number> => {
  return RendererProcess.invoke('TestFrameWork.createDropSession', items)
}

export interface DragDataItem {
  readonly data: string
  readonly type: string
}

export interface DragData {
  readonly items: readonly DragDataItem[]
  readonly label?: string
}

export const getDragData = async (): Promise<DragData> => {
  const dragData: DragData | null = await RendererWorker.invoke('Viewlet.getDragData')
  if (!dragData) {
    throw new AssertionError('Expected drag data to be available')
  }
  return dragData
}

export const shouldHaveDragData = async (expectedItems: readonly DragDataItem[]): Promise<void> => {
  const { items } = await getDragData()
  if (
    items.length !== expectedItems.length ||
    expectedItems.some((expected) => items.every((item) => item.type !== expected.type || item.data !== expected.data))
  ) {
    throw new AssertionError(`Expected drag data ${JSON.stringify(expectedItems)} but was ${JSON.stringify(items)}`)
  }
}

export const createDropSessionFromDragData = async (): Promise<number> => {
  const { items } = await getDragData()
  return createDropSession(items.map((item) => ({ kind: 'string', type: item.type, value: item.data })))
}
