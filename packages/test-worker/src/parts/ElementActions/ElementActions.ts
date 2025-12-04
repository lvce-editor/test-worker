import type { IElementAction } from '../IElementAction/IElementAction.ts'
import * as DomEventType from '../DomEventType/DomEventType.ts'

export const mouseEvent = (eventType: string, options: any): IElementAction => {
  return {
    constructor: 'MouseEvent',
    eventType,
    options,
    type: 'dispatch',
  }
}

export const mouseDown = (options: any): readonly IElementAction[] => {
  return [mouseEvent(DomEventType.MouseDown, options)]
}

export const mouseUp = (options: any): readonly IElementAction[] => {
  return [mouseEvent(DomEventType.MouseUp, options)]
}

export const contextMenu = (options: any): readonly IElementAction[] => {
  return [mouseEvent(DomEventType.ContextMenu, options)]
}

export const click = (options: any): readonly IElementAction[] => {
  const actions: IElementAction[] = [...mouseDown(options), mouseEvent(DomEventType.Click, options), ...mouseUp(options)]
  if (options.button === 2 /* right */) {
    actions.push(...contextMenu(options))
  }
  return actions
}

export const hover = (options: any): readonly IElementAction[] => {
  return [mouseEvent(DomEventType.MouseEnter, options)]
}

export const type = (options: any): readonly IElementAction[] => {
  return [
    {
      constructor: '',
      eventType: '',
      options,
      type: 'type',
    },
  ]
}

export const keyboardEvent = (eventType: string, options: any): IElementAction => {
  return {
    constructor: 'MouseEvent',
    eventType,
    options,
    type: 'dispatch',
  }
}

export const keyDown = (options: any): readonly IElementAction[] => {
  return [keyboardEvent(DomEventType.KeyDown, options)]
}

export const keyUp = (options: any): readonly IElementAction[] => {
  return [keyboardEvent(DomEventType.KeyUp, options)]
}
