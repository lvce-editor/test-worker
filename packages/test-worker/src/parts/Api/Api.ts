import type { test } from '../TestFrameWork/TestFrameWork.ts'
import type { expect, getTmpDir, Locator } from '../TestFrameWork/TestFrameWork.ts'
import type * as About from '../TestFrameWorkComponentAbout/TestFrameWorkComponentAbout.ts'
import type * as ActivityBar from '../TestFrameWorkComponentActivityBar/TestFrameworkComponentActivityBar.ts'
import type * as ClipBoard from '../TestFrameWorkComponentClipBoard/TestFrameworkComponentClipBoard.ts'
import type * as Command from '../TestFrameWorkComponentCommand/TestFrameWorkComponentCommand.ts'
import type * as ContextMenu from '../TestFrameWorkComponentContextMenu/TestFrameWorkComponentContextMenu.ts'
import type * as Developer from '../TestFrameWorkComponentDeveloper/TestFrameWorkComponentDeveloper.ts'
import type * as Dialog from '../TestFrameWorkComponentDialog/TestFrameWorkComponentDialog.ts'
import type * as Editor from '../TestFrameWorkComponentEditor/TestFrameWorkComponentEditor.ts'
import type * as EditorCompletion from '../TestFrameWorkComponentEditorCompletion/TestFrameWorkComponentEditorCompletion.ts'
import type * as EditorHover from '../TestFrameWorkComponentEditorHover/TestFrameWorkComponentEditorHover.ts'
import type * as EditorRename from '../TestFrameWorkComponentEditorRename/TestFrameWorkComponentEditorRename.ts'
import type * as EditorSourceAction from '../TestFrameWorkComponentEditorSourceAction/TestFrameWorkComponentEditorSourceAction.ts'
import type * as Explorer from '../TestFrameWorkComponentExplorer/TestFrameWorkComponentExplorer.ts'
import type * as Extension from '../TestFrameWorkComponentExtension/TestFrameWorkComponentExtension.ts'
import type * as ExtensionDetail from '../TestFrameWorkComponentExtensionDetail/TestFrameWorkComponentExtensionDetail.ts'
import type * as ExtensionSearch from '../TestFrameWorkComponentExtensionSearch/TestFrameWorkComponentExtensionSearch.ts'
import type * as FileSystem from '../TestFrameWorkComponentFileSystem/TestFrameWorkComponentFileSystem.ts'
import type * as FindWidget from '../TestFrameWorkComponentFindWidget/TestFrameWorkComponentFindWidget.ts'
import type * as IconTheme from '../TestFrameWorkComponentIconTheme/TestFrameWorkComponentIconTheme.ts'
import type * as IframeInspector from '../TestFrameWorkComponentIframeInspector/TestFrameWorkComponentIframeInspector.ts'
import type * as KeyBindingsEditor from '../TestFrameWorkComponentKeyBindingsEditor/TestFrameWorkComponentKeyBindingsEditor.ts'
import type * as KeyBoard from '../TestFrameWorkComponentKeyBoard/TestFrameWorkComponentKeyBoard.ts'
import type * as Main from '../TestFrameWorkComponentMain/TestFrameWorkComponentMain.ts'
import type * as Output from '../TestFrameWorkComponentOutput/TestFrameWorkComponentOutput.ts'
import type * as Panel from '../TestFrameWorkComponentPanel/TestFrameWorkComponentPanel.ts'
import type * as Platform from '../TestFrameWorkComponentPlatform/TestFrameWorkComponentPlatform.ts'
import type * as Problems from '../TestFrameWorkComponentProblems/TestFrameWorkComponentProblems.ts'
import type * as QuickPick from '../TestFrameWorkComponentQuickPick/TestFrameWorkComponentQuickPick.ts'
import type * as References from '../TestFrameWorkComponentReferences/TestFrameWorkComponentReferences.ts'
import type * as RunAndDebug from '../TestFrameWorkComponentRunAndDebug/TestFrameWorkComponentRunAndDebug.ts'
import type * as Search from '../TestFrameWorkComponentSearch/TestFrameWorkComponentSearch.ts'
import type * as Settings from '../TestFrameWorkComponentSettings/TestFrameWorkComponentSettings.ts'
import type * as SettingsView from '../TestFrameWorkComponentSettingsView/TestFrameWorkComponentSettingsView.ts'
import type * as SideBar from '../TestFrameWorkComponentSideBar/TestFrameWorkComponentSideBar.ts'
import type * as SourceControl from '../TestFrameWorkComponentSourceControl/TestFrameWorkComponentSourceControl.ts'
import type * as StatusBar from '../TestFrameWorkComponentStatusBar/TestFrameWorkComponentStatusBar.ts'
import type * as TitleBarMenuBar from '../TestFrameWorkComponentTitleBarMenuBar/TestFrameWorkComponentTitleBarMenuBar.ts'
import type * as Url from '../TestFrameWorkComponentUrl/TestFrameWorkComponentUrl.ts'
import type * as WebView from '../TestFrameWorkComponentWebView/TestFrameWorkComponentWebView.ts'
import type * as Workspace from '../TestFrameWorkComponentWorkspace/TestFrameWorkComponentWorkspace.ts'

type IFileSystem = Omit<typeof FileSystem, 'loadFixture'> & {
  readonly loadFixture: (url: string) => Promise<string>
}

type IBaseUrl = {
  readonly getBaseUrl: () => string
}

export interface Api {
  About: typeof About
  ActivityBar: typeof ActivityBar
  BaseUrl: IBaseUrl
  ClipBoard: typeof ClipBoard
  Command: typeof Command
  ContextMenu: typeof ContextMenu
  Developer: typeof Developer
  Dialog: typeof Dialog
  Editor: typeof Editor
  EditorCompletion: typeof EditorCompletion
  EditorHover: typeof EditorHover
  EditorRename: typeof EditorRename
  EditorSourceAction: typeof EditorSourceAction
  Explorer: typeof Explorer
  Extension: typeof Extension
  ExtensionDetail: typeof ExtensionDetail
  ExtensionSearch: typeof ExtensionSearch
  FileSystem: IFileSystem
  FindWidget: typeof FindWidget
  IconTheme: typeof IconTheme
  IframeInspector: typeof IframeInspector
  KeyBindingsEditor: typeof KeyBindingsEditor
  KeyBoard: typeof KeyBoard
  Main: typeof Main
  Output: typeof Output
  Panel: typeof Panel
  Platform: typeof Platform
  Problems: typeof Problems
  QuickPick: typeof QuickPick
  References: typeof References
  RunAndDebug: typeof RunAndDebug
  Search: typeof Search
  Settings: typeof Settings
  SettingsView: typeof SettingsView
  SideBar: typeof SideBar
  SourceControl: typeof SourceControl
  StatusBar: typeof StatusBar
  TitleBarMenuBar: typeof TitleBarMenuBar
  Url: typeof Url
  WebView: typeof WebView
  Workspace: typeof Workspace
  test: typeof test
  Locator: typeof Locator
  expect: typeof expect
  getTmpDir: typeof getTmpDir
}
