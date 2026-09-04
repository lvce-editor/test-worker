import { defineConfig } from 'eslint/config'
import * as config from '@lvce-editor/eslint-config'
import tsconfig from '@lvce-editor/eslint-plugin-tsconfig'

export default defineConfig([
  ...config.default,
  ...config.recommendedActions,
  ...config.recommendedRegex,
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
