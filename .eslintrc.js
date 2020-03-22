module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    React: true,
    ReactDOM: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true
    },
    ecmaVersion: 6,
    sourceType: 'module',
  },
  parser: 'babel-eslint', // Parsing error: The keyword 'import' is reserved
  plugins: [
    'react',
    'react-hooks',
    'import'

  ],
  rules: {
    "react-hooks/rules-of-hooks": "error"
  },
};
