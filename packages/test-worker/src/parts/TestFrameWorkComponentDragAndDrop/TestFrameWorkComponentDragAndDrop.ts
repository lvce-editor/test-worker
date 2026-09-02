import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

export interface DropSessionStringItem {
  readonly kind: 'string'
  readonly type: string
  readonly value: string
}

export interface DropSessionFileItem {
  readonly file?: File
  readonly fileSystemHandle?: FileSystemHandle
  readonly kind: 'file'
  readonly type: string
}

export type DropSessionItem = DropSessionFileItem | DropSessionStringItem

export const createDropSession = (items: readonly DropSessionItem[]): Promise<number> => {
  return RendererProcess.invoke('TestFrameWork.createDropSession', items)
}
