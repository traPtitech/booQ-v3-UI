import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/.vite/**'],
  },
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      vue: vue,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-empty': ['error', { allowEmptyCatch: true }],
      eqeqeq: 'error',
      'vue/eqeqeq': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      'vue/require-default-prop': 'off',
      'vue/block-lang': [
        'error',
        {
          script: { lang: 'ts' },
          style: { lang: 'scss' },
        },
      ],
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      'vue/v-on-event-hyphenation': ['error', 'always', { autofix: true }],
      'vue/no-template-target-blank': 'error',
      'vue/prefer-true-attribute-shorthand': 'error',
      'vue/prefer-import-from-vue': 'error',
    },
  },
  {
    files: ['*.{js,mjs}', 'vite.config.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    files: ['src/apis/openapi.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  prettier,
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
];
