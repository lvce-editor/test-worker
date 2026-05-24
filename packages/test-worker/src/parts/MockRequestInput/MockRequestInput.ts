type EmptyObject = Record<string, never>

interface ToolCallItemBase<TArguments, TName extends string> {
  readonly toolCall: {
    readonly arguments: TArguments
    readonly name: TName
  }
}

interface ToolCallItemReadFileArgs {
  readonly uri: string
  readonly [key: string]: unknown
}

interface ToolCallItemWriteFileArgs {
  readonly content: string
  readonly uri: string
  readonly [key: string]: unknown
}

interface ToolCallItemSearchFilesArgs {
  readonly query: string
  readonly [key: string]: unknown
}

interface ToolCallItemTextSearchArgs {
  readonly query: string
  readonly [key: string]: unknown
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
