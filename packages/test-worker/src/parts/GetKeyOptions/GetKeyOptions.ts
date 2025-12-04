import * as Key from '../Key/Key.ts'

export const getKeyOptions = (rawKey: string): any => {
  if (rawKey.includes('+')) {
    const parts = rawKey.split('+')
    let ctrlKey = false
    let altKey = false
    let key = ''
    for (const part of parts) {
      switch (part) {
        case Key.Alt:
          altKey = true
          break
        case Key.Control:
          ctrlKey = true
          break
        case Key.Space:
          key = ' '
          break
        default:
          key = part
          break
      }
    }
    return {
      altKey,
      ctrlKey,
      key,
    }
  }
  return {
    altKey: false,
    ctrlKey: false,
    key: rawKey,
  }
}
