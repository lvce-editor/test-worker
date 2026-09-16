import * as DirectViewWorker from '../DirectViewWorker/DirectViewWorker.ts'

export const closeMenu: () => Promise<void> = DirectViewWorker.invoke.bind(undefined, 'TitleBar', 'TitleBar.closeMenu')

export const focus: () => Promise<void> = DirectViewWorker.invoke.bind(undefined, 'TitleBar', 'TitleBar.focus')

export const focusFirst: () => Promise<void> = DirectViewWorker.invoke.bind(undefined, 'TitleBar', 'TitleBar.focusFirst')

export const setTitleTemplate: (template: string) => Promise<void> = DirectViewWorker.invoke.bind(undefined, 'TitleBar', 'TitleBar.setTitleTemplate')

export const setWidth: (width: number) => Promise<void> = DirectViewWorker.invoke.bind(undefined, 'TitleBar', 'TitleBar.setWidth')

export const handleWorkspaceChange: (uri: string) => Promise<void> = DirectViewWorker.invoke.bind(
  undefined,
  'TitleBar',
  'TitleBar.handleWorkspaceChange',
)

export const focusIndex: (index: number) => Promise<void> = DirectViewWorker.invoke.bind(undefined, 'TitleBar', 'TitleBar.focusIndex')

export const focusLast: () => Promise<void> = DirectViewWorker.invoke.bind(undefined, 'TitleBar', 'TitleBar.focusLast')

export const focusNext: () => Promise<void> = DirectViewWorker.invoke.bind(undefined, 'TitleBar', 'TitleBar.focusNext')

export const focusPrevious: () => Promise<void> = DirectViewWorker.invoke.bind(undefined, 'TitleBar', 'TitleBar.focusPrevious')

export const handleKeyArrowDown: () => Promise<void> = DirectViewWorker.invoke.bind(undefined, 'TitleBar', 'TitleBar.handleKeyArrowDown')

export const handleKeyArrowLeft: () => Promise<void> = DirectViewWorker.invoke.bind(undefined, 'TitleBar', 'TitleBar.handleKeyArrowLeft')

export const handleKeyArrowRight: () => Promise<void> = DirectViewWorker.invoke.bind(undefined, 'TitleBar', 'TitleBar.handleKeyArrowRight')

export const handleKeyArrowUp: () => Promise<void> = DirectViewWorker.invoke.bind(undefined, 'TitleBar', 'TitleBar.handleKeyArrowUp')

export const handleKeyEnd: () => Promise<void> = DirectViewWorker.invoke.bind(undefined, 'TitleBar', 'TitleBar.handleKeyEnd')

export const handleKeyHome: () => Promise<void> = DirectViewWorker.invoke.bind(undefined, 'TitleBar', 'TitleBar.handleKeyHome')

export const handleKeySpace: () => Promise<void> = DirectViewWorker.invoke.bind(undefined, 'TitleBar', 'TitleBar.handleKeySpace')

export const handleKeyEscape: () => Promise<void> = DirectViewWorker.invoke.bind(undefined, 'TitleBar', 'TitleBar.handleKeyEscape')

export const toggleIndex: (index: number) => Promise<void> = DirectViewWorker.invoke.bind(undefined, 'TitleBar', 'TitleBar.toggleIndex')

export const toggleMenu: () => Promise<void> = DirectViewWorker.invoke.bind(undefined, 'TitleBar', 'TitleBar.toggleMenu')

export const handleContextMenu: (button: number, x: number, y: number) => Promise<void> = DirectViewWorker.invoke.bind(
  undefined,
  'TitleBar',
  'TitleBar.handleContextMenu',
)
