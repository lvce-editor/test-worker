export const waitForFirstEventEvent = async (port: MessagePort): Promise<MessageEvent> => {
  const { promise, resolve } = Promise.withResolvers<MessageEvent>()
  port.onmessage = resolve
  const firstEvent = await promise
  return firstEvent
}
