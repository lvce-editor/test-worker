export const waitForFirstEventEvent = async (port: MessagePort): Promise<MessageEvent> => {
  const { resolve, promise } = Promise.withResolvers<MessageEvent>()
  port.onmessage = resolve
  const firstEvent = await promise
  return firstEvent
}