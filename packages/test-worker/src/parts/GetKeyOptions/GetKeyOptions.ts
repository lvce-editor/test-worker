import * as Key from '../Key/Key.ts'

const applyKeyPart = (part: string, options: any): void => {
  switch (part) {
    case Key.Alt: {
      options.altKey = true
      return
    }
    case Key.Control: {
      options.ctrlKey = true
      return
    }
    case Key.Shift: {
      options.shiftKey = true
      return
    }
    case Key.Space: {
      options.key = ' '
      return
    }
    default: {
      options.key = part
    }
  }
}

export const getKeyOptions = (rawKey: string): any => {
  if (rawKey.includes('+')) {
    const parts = rawKey.split('+')
    const options = {
      altKey: false,
      ctrlKey: false,
      key: '',
      shiftKey: false,
    }
    for (const part of parts) {
      applyKeyPart(part, options)
    }
    return options
  }
  return {
    altKey: false,
    ctrlKey: false,
    key: rawKey,
    shiftKey: false,
  }
}
