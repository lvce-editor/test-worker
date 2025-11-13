import config from '@lvce-editor/eslint-config'
import actions from '@lvce-editor/eslint-plugin-github-actions'

export default [
  ...config,
  ...actions,
  {
    ignores: ['src/testWorkerMain.ts'],
  },
  {
    files: ['**/*.ts'],
    rules: {
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
