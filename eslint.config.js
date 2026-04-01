import config from '@lvce-editor/eslint-config'
import actions from '@lvce-editor/eslint-plugin-github-actions'
import regex from '@lvce-editor/eslint-plugin-regex'
import tsconfig from '@lvce-editor/eslint-plugin-tsconfig'

export default [
  ...config,
  ...actions,
  ...regex,
  ...tsconfig,
  {
    ignores: ['src/testWorkerMain.ts'],
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@cspell/spellchecker': 'off',

      'no-useless-catch': 'off',
      'no-ex-assign': 'off',
      'jest/no-restricted-jest-methods': 'off',
    },
  },
  {
    rules: {
      'github-actions/permissions': 'off',
    },
  },
]
