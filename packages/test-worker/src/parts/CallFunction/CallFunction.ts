export const callFunction = async (fn: any, args: any): Promise<any> => {
  try {
    await fn(args)
    return undefined
  } catch (error) {
    return error
  }
}
