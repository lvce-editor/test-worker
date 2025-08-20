export const stringifyJson = (data: any): string => {
  return JSON.stringify(data, null, 2) + '\n'
}
