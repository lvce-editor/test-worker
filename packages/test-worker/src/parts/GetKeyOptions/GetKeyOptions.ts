import * as Key from '../Key/Key.ts'

export const getKeyOptions = (rawKey: string): any => {
  if (rawKey.includes('+')) {
    const parts = rawKey.split('+')
    let ctrlKey = false
    let altKey = false
    let key = ''
    for (const part of parts) {
      switch (part) {
        case Key.Control:
          ctrlKey = true
          break
        case Key.Space:
          key = ' '
          break
        case Key.Alt:
          altKey = true
          break
        default:
          key = part
          break
      }
    }
    return {
      key,
      ctrlKey,
      altKey,
    }
  }
  return {
    key: rawKey,
    ctrlKey: false,
    altKey: false,
  }
}
