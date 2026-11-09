import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.title-bar-menu-bar-keyboard-navigation'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  // act
  await TitleBarMenuBar.focus()

  // assert
  const titleBarItemFile = Locator('.TitleBarTopLevelEntry', {
    hasText: 'File',
  })
  await expect(titleBarItemFile).toHaveAttribute('id', 'TitleBarEntryActive')

  // act
  await TitleBarMenuBar.handleKeyArrowDown()

  // assert
  const menu0 = Locator('#Menu-0')
  await expect(menu0).toBeVisible()
  const menuItemNewFile = Locator('.MenuItem', { hasText: 'New File' })
  await expect(menuItemNewFile).toBeFocused()

  // act
  await TitleBarMenuBar.handleKeyEscape()

  // assert
  await expect(titleBarItemFile).toHaveAttribute('id', 'TitleBarEntryActive')

  // act
  await TitleBarMenuBar.handleKeyArrowRight()

  // assert
  const titleBarItemEdit = Locator('.TitleBarTopLevelEntry', {
    hasText: 'Edit',
  })
  await expect(titleBarItemEdit).toHaveAttribute('id', 'TitleBarEntryActive')

  // act
  await TitleBarMenuBar.handleKeyArrowDown()

  // assert
  await expect(menu0).toBeVisible()
  const menuItemUndo = Locator('.MenuItem', {
    hasText: 'Undo',
  })
  await expect(menuItemUndo).toBeFocused()

  // act
  await TitleBarMenuBar.handleKeyEnd()

  // assert
  const menuItemToggleBlockComment = Locator('.MenuItem', {
    hasText: 'Toggle Block Comment',
  })
  await expect(menuItemToggleBlockComment).toBeFocused()

  // act
  await TitleBarMenuBar.handleKeyHome()

  // assert
  await expect(menuItemUndo).toBeFocused()

  // act
  await TitleBarMenuBar.handleKeyEscape()

  // assert
  await expect(titleBarItemEdit).toHaveAttribute('id', 'TitleBarEntryActive')

  // act
  await TitleBarMenuBar.handleKeyHome()

  // assert
  await expect(titleBarItemFile).toHaveAttribute('id', 'TitleBarEntryActive')

  // act
  await TitleBarMenuBar.handleKeyEnd()

  // assert
  const titleBarItemHelp = Locator('.TitleBarTopLevelEntry', {
    hasText: 'Help',
  })
  await expect(titleBarItemHelp).toHaveAttribute('id', 'TitleBarEntryActive')

  // act
  await TitleBarMenuBar.handleKeyArrowRight()

  // assert
  await expect(titleBarItemFile).toHaveAttribute('id', 'TitleBarEntryActive')

  // act
  await TitleBarMenuBar.handleKeyArrowDown()

  // assert
  await TitleBarMenuBar.handleKeyEnd()

  // assert
  const menuItemAutoSave = Locator('.MenuItem', {
    hasText: 'Auto Save',
  })
  await expect(menuItemAutoSave).toBeFocused()

  // act
  await TitleBarMenuBar.handleKeyArrowUp()
  await TitleBarMenuBar.handleKeyArrowUp()

  // assert
  const menuItemOpenRecent = Locator('.MenuItem', {
    hasText: 'Open Recent',
  })
  await expect(menuItemOpenRecent).toBeFocused()

  // act
  await TitleBarMenuBar.handleKeyArrowRight()

  // assert
  const menu1 = Locator('#Menu-1')
  await expect(menu1).toBeVisible()

  // act
  await TitleBarMenuBar.handleKeyArrowLeft()

  // assert
  await expect(menu1).toBeHidden()

  // act
  await TitleBarMenuBar.handleKeyArrowRight()

  // assert
  await expect(menu1).toBeVisible()

  // act
  await TitleBarMenuBar.handleKeyEscape()

  await expect(menu1).toBeHidden()
  await expect(menuItemOpenRecent).toBeFocused()
}
