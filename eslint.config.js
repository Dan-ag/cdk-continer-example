import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['bin/**/*', 'dist/**/*', 'lib/**/*', 'test/**/*']
  },
  {
    files: ['src/**/*.ts'],
    plugins: {
      prettier
    },
    rules: {
      'prettier/prettier': 'error',
      'no-useless-constructor': 'off',
      'no-console': ['error', { allow: ['time', 'timeEnd', 'dir'] }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public',
          overrides: {
            constructors: 'off',
            methods: 'off',
            properties: 'off'
          }
        }
      ],
      '@typescript-eslint/prefer-readonly': 'error'
    }
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  }
];
