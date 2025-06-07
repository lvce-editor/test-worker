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
      '@typescript-eslint/restrict-plus-operands': 'off',
      'n/no-unsupported-features/es-syntax': 'off',
      'n/no-unpublished-import': 'off',
      'n/no-unsupported-features/node-builtins': 'off',
    },
  },
]
