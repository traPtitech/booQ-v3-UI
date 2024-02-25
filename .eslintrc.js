module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  rules: {
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
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    'vue/v-on-event-hyphenation': ['error', 'always', { autofix: true }],
    'vue/v-on-function-call': 'error',
    'vue/no-template-target-blank': 'error',
    'vue/prefer-true-attribute-shorthand': 'error',
    'vue/prefer-import-from-vue': 'error',
  },
  overrides: [
    {
      // 直下のファイル
      files: ['*.{js,mjs}'],
      excludedFiles: ['*/**/*.{js,mjs}'],
      env: {
        node: true,
      },

      rules: { '@typescript-eslint/no-var-requires': 'off' },
    },
    {
      files: ['*src/apis/openapi.ts'],
      env: {
        node: true,
      },

      rules: { '@typescript-eslint/no-explicit-any': 'off' },
    },
  ],
  reportUnusedDisableDirectives: true,
};
