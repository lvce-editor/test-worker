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

type ToolCallItemGetWorkspaceUri = ToolCallItemBase<EmptyObject, 'getWorkspaceUri'>

type ToolCallItemReadFile = ToolCallItemBase<ToolCallItemReadFileArgs, 'read_file'>

type ToolCallItemWriteFile = ToolCallItemBase<ToolCallItemWriteFileArgs, 'write_file'>

type ToolCallItemSearchFiles = ToolCallItemBase<ToolCallItemSearchFilesArgs, 'search_files'>

type ToolCallItemTextSearch = ToolCallItemBase<ToolCallItemTextSearchArgs, 'text_search'>

type ToolCallItem =
  | ToolCallItemGetWorkspaceUri
  | ToolCallItemReadFile
  | ToolCallItemWriteFile
  | ToolCallItemSearchFiles
  | ToolCallItemTextSearch

interface TextItem {
  readonly text: string
}

export type MockRequestInput = ToolCallItem | TextItem
