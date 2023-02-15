/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'airbnb-base',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
      },
    ],
    'no-alert': 'off',
    'no-console': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.vue'],
      },
    },
    'import/core-modules': [
      'vite',
      '@vitejs/plugin-vue',
      '@rushstack/eslint-patch/modern-module-resolution',
      'axios',
      'lodash',
      'vee-validate',
      '@vee-validate/rules',
      '@vee-validate/i18n',
    ],
  },
};
