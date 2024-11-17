export const getPortTuple = (): { port1: MessagePort; port2: MessagePort } => {
  const { port1, port2 } = new MessageChannel()
  return { port1, port2 }
}
