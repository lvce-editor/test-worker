import type { Plugin } from 'rollup'

const RE_ROLLUP_NAMESPACE_PROTO_NULL = /^\s*__proto__:\s*null,\n/gm

export const removeProtoNullPlugin = (): Plugin => {
  return {
    name: 'remove-proto-null',
    renderChunk(code) {
      const cleaned = code.replace(RE_ROLLUP_NAMESPACE_PROTO_NULL, '')
      if (cleaned === code) {
        return null
      }
      return {
        code: cleaned,
        map: null,
      }
    },
  }
}