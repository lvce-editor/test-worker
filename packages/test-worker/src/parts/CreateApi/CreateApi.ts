import type { Api } from '../Api/Api.ts'
import { expect, getTmpDir, Locator, test } from '../TestFrameWork/TestFrameWork.ts'
import { ColorPicker } from '../TestFrameWorkComponent/TestFrameWorkComponent.ts'
import * as About from '../TestFrameWorkComponentAbout/TestFrameWorkComponentAbout.ts'
import * as ActivityBar from '../TestFrameWorkComponentActivityBar/TestFrameworkComponentActivityBar.ts'
import * as Audio from '../TestFrameWorkComponentAudio/TestFrameWorkComponentAudio.ts'
import * as ClipBoard from '../TestFrameWorkComponentClipBoard/TestFrameworkComponentClipBoard.ts'
import * as Command from '../TestFrameWorkComponentCommand/TestFrameWorkComponentCommand.ts'
import * as ContextMenu from '../TestFrameWorkComponentContextMenu/TestFrameWorkComponentContextMenu.ts'
import * as Developer from '../TestFrameWorkComponentDeveloper/TestFrameWorkComponentDeveloper.ts'
import * as Dialog from '../TestFrameWorkComponentDialog/TestFrameWorkComponentDialog.ts'
import * as Editor from '../TestFrameWorkComponentEditor/TestFrameWorkComponentEditor.ts'
import * as EditorCompletion from '../TestFrameWorkComponentEditorCompletion/TestFrameWorkComponentEditorCompletion.ts'
import * as EditorHover from '../TestFrameWorkComponentEditorHover/TestFrameWorkComponentEditorHover.ts'
import * as EditorRename from '../TestFrameWorkComponentEditorRename/TestFrameWorkComponentEditorRename.ts'
import * as EditorSourceAction from '../TestFrameWorkComponentEditorSourceAction/TestFrameWorkComponentEditorSourceAction.ts'
import * as Explorer from '../TestFrameWorkComponentExplorer/TestFrameWorkComponentExplorer.ts'
import * as Extension from '../TestFrameWorkComponentExtension/TestFrameWorkComponentExtension.ts'
import * as ExtensionDetail from '../TestFrameWorkComponentExtensionDetail/TestFrameWorkComponentExtensionDetail.ts'
import * as ExtensionSearch from '../TestFrameWorkComponentExtensionSearch/TestFrameWorkComponentExtensionSearch.ts'
import * as FileSystem from '../TestFrameWorkComponentFileSystem/TestFrameWorkComponentFileSystem.ts'
import * as FindWidget from '../TestFrameWorkComponentFindWidget/TestFrameWorkComponentFindWidget.ts'
import * as IconTheme from '../TestFrameWorkComponentIconTheme/TestFrameWorkComponentIconTheme.ts'
import * as IframeInspector from '../TestFrameWorkComponentIframeInspector/TestFrameWorkComponentIframeInspector.ts'
import * as KeyBindingsEditor from '../TestFrameWorkComponentKeyBindingsEditor/TestFrameWorkComponentKeyBindingsEditor.ts'
import * as KeyBoard from '../TestFrameWorkComponentKeyBoard/TestFrameWorkComponentKeyBoard.ts'
import * as LanguageModels from '../TestFrameWorkComponentLanguageModels/TestFrameWorkComponentLanguageModels.ts'
import * as Main from '../TestFrameWorkComponentMain/TestFrameWorkComponentMain.ts'
import * as Output from '../TestFrameWorkComponentOutput/TestFrameWorkComponentOutput.ts'
import * as Panel from '../TestFrameWorkComponentPanel/TestFrameWorkComponentPanel.ts'
import * as Platform from '../TestFrameWorkComponentPlatform/TestFrameWorkComponentPlatform.ts'
import * as Preview from '../TestFrameWorkComponentPreview/TestFrameWorkComponentPreview.ts'
import * as Problems from '../TestFrameWorkComponentProblems/TestFrameWorkComponentProblems.ts'
import * as QuickPick from '../TestFrameWorkComponentQuickPick/TestFrameWorkComponentQuickPick.ts'
import * as References from '../TestFrameWorkComponentReferences/TestFrameWorkComponentReferences.ts'
import * as RunAndDebug from '../TestFrameWorkComponentRunAndDebug/TestFrameWorkComponentRunAndDebug.ts'
import * as Search from '../TestFrameWorkComponentSearch/TestFrameWorkComponentSearch.ts'
import * as Settings from '../TestFrameWorkComponentSettings/TestFrameWorkComponentSettings.ts'
import * as SettingsView from '../TestFrameWorkComponentSettingsView/TestFrameWorkComponentSettingsView.ts'
import * as SideBar from '../TestFrameWorkComponentSideBar/TestFrameWorkComponentSideBar.ts'
import * as SourceControl from '../TestFrameWorkComponentSourceControl/TestFrameWorkComponentSourceControl.ts'
import * as StatusBar from '../TestFrameWorkComponentStatusBar/TestFrameWorkComponentStatusBar.ts'
import * as TitleBarMenuBar from '../TestFrameWorkComponentTitleBarMenuBar/TestFrameWorkComponentTitleBarMenuBar.ts'
import * as Url from '../TestFrameWorkComponentUrl/TestFrameWorkComponentUrl.ts'
import * as WebView from '../TestFrameWorkComponentWebView/TestFrameWorkComponentWebView.ts'
import * as Workspace from '../TestFrameWorkComponentWorkspace/TestFrameWorkComponentWorkspace.ts'

export const createApi = (platform: number, assetDir: string): Api => {
  return {
    About,
    ActivityBar,
    Audio,
    BaseUrl: {
      getBaseUrl(): string {
        return assetDir
      },
    },
    ClipBoard,
    ColorPicker,
    Command,
    ContextMenu,
    Developer,
    Dialog,
    Editor,
    EditorCompletion,
    EditorHover,
    EditorRename,
    EditorSourceAction,
    expect,
    Explorer,
    Extension,
    ExtensionDetail,
    ExtensionSearch,
    FileSystem: {
      ...FileSystem,
      loadFixture(url: string): Promise<string> {
        return FileSystem.loadFixture(platform, url)
      },
    },
    FindWidget,
    getTmpDir, // TODO maybe deprecate this or move to file system
    IconTheme,
    IframeInspector,
    KeyBindingsEditor,
    KeyBoard,
    LanguageModels,
    Locator,
    Main,
    Output,
    Panel,
    Platform,
    Preview,
    Problems,
    QuickPick,
    References,
    RunAndDebug,
    Search,
    Settings,
    SettingsView,
    SideBar,
    SourceControl,
    StatusBar,
    test,
    TitleBarMenuBar,
    Url,
    WebView,
    Workspace,
  }
}
