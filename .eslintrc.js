module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 6,
  },
  rules: {
    semi: 'warn',
    quotes: ['warn', 'single'],
    eqeqeq: 'warn',
  },
};
