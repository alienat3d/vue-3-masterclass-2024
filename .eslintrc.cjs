/* eslint-env node */
import '@rushstack/eslint-patch/modern-module-resolution'

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-names': 0 // although it’s a good rule, but not in our case, while we’re using file-based routing with the "unplugin Vue Router"
  }
}
