import * as DomEventType from '../DomEventType/DomEventType.ts'
import { IElementAction } from '../IElementAction/IElementAction.ts'

export const mouseEvent = (eventType: string, options: any): IElementAction => {
  return {
    type: 'dispatch',
    constructor: 'MouseEvent',
    eventType,
    options,
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
      type: 'type',
      constructor: '',
      eventType: '',
      options,
    },
  ]
}

export const keyboardEvent = (eventType: string, options: any): IElementAction => {
  return {
    type: 'dispatch',
    constructor: 'MouseEvent',
    eventType,
    options,
  }
}

export const keyDown = (options: any): readonly IElementAction[] => {
  return [keyboardEvent(DomEventType.KeyDown, options)]
}

export const keyUp = (options: any): readonly IElementAction[] => {
  return [keyboardEvent(DomEventType.KeyUp, options)]
}
