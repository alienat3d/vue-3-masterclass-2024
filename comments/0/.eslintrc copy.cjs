/* eslint-env node */
// require('@rushstack/eslint-patch/modern-module-resolution')
import '@rushstack/eslint-patch/modern-module-resolution'

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    // 'plugin:vue/vue3-strongly-recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // 'no-unused-vars': 'off'
    // 'no-unused-vars': 0 - same as 'off'
    // 'no-unused-vars': 'warn' - show warning instead of an error
    // 'no-unused-vars': 1 - same as 'off'
    // 'no-unused-vars': 'error' - show an error
    // 'no-unused-vars': 1 - same as 'error'
  }
}
