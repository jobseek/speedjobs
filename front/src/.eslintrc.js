module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'react-app',
    'react-app/jest',
    'naver',
    'plugin:prettier/recommended',
  ],
  // "parserOptions": {
  //     "ecmaFeatures": {
  //         "jsx": true
  //     },
  //     "ecmaVersion": 12,
  //     "sourceType": "module"
  // },
  plugins: ['react', 'prettier'],
  rules: {
    'react/prop-types': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'prefer-template': 'off',
    'class-methods-use-this': 'off',
    'consistent-this': 'off',
    'no-console': 'off',
    'no-alert': 'off',
    'no-unused-vars': 'warn',
    'dot-notation': 'off',
    'padding-line-between-statements': 'off',
  },
};
