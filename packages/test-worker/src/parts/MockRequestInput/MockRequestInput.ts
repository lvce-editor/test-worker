type EmptyObject = Record<string, never>

interface ToolCallItemBase<TArguments, TName extends string> {
  readonly toolCall: {
    readonly arguments: TArguments
    readonly name: TName
  }
}

interface ToolCallItemReadFileArgs {
  readonly uri: string
}

interface ToolCallItemWriteFileArgs {
  readonly content: string
  readonly uri: string
}

interface ToolCallItemSearchFilesArgs {
  readonly query: string
}

interface ToolCallItemTextSearchArgs {
  readonly query: string
}

export type ToolCallItemGetWorkspaceUri = ToolCallItemBase<EmptyObject, 'getWorkspaceUri'>

export type ToolCallItemReadFile = ToolCallItemBase<ToolCallItemReadFileArgs, 'read_file'>

export type ToolCallItemWriteFile = ToolCallItemBase<ToolCallItemWriteFileArgs, 'write_file'>

export type ToolCallItemSearchFiles = ToolCallItemBase<ToolCallItemSearchFilesArgs, 'search_files'>

export type ToolCallItemTextSearch = ToolCallItemBase<ToolCallItemTextSearchArgs, 'text_search'>

export type ToolCallItem =
  | ToolCallItemGetWorkspaceUri
  | ToolCallItemReadFile
  | ToolCallItemWriteFile
  | ToolCallItemSearchFiles
  | ToolCallItemTextSearch

export interface TextItem {
  readonly text: string
}

export type MockRequestInput = ToolCallItem | TextItem
