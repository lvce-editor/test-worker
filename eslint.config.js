import config from '@lvce-editor/eslint-config'

export default [
  ...config,
  {
    ignores: ['src/testWorkerMain.ts'],
  },
  {
    files: ['**/*.ts'],
    rules: {
      'no-useless-catch': 'off',
      'no-ex-assign': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      'jest/no-restricted-jest-methods': 'off',
    },
  },
]
