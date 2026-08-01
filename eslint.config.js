import { defineConfig } from 'eslint/config'
import config, { recommendedActions } from '@lvce-editor/eslint-config'
import regex from '@lvce-editor/eslint-plugin-regex'
import tsconfig from '@lvce-editor/eslint-plugin-tsconfig'

export default defineConfig([
  ...config,
  ...recommendedActions,
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
      'unicorn/prefer-short-arrow-method': 'off',
    },
  },
  {
    rules: {
      'github-actions/permissions': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      'unicorn/consistent-compound-words': 'off',
    },
  },
])
