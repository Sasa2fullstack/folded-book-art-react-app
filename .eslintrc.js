module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  parser: 'babel-eslint',
  extends: ['airbnb'],
  plugins: ['import', 'jsx-a11y', 'prettier'],
  rules: {
    'comma-dangle': [2, 'always-multiline'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.js', '**/*.spec.js', '**/*.stories.js'] }],
    'max-len': ['error', { code: 180, ignorePattern: '^\\s*<path' }],
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'object-curly-newline': [
      'error',
      {
        consistent: true,
        multiline: true
      }
    ],
    semi: ['error', 'always', { omitLastInOneLineBlock: true }],
    'space-before-function-paren': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/html-has-lang': 0,
    'jsx-a11y/no-autofocus': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react/button-has-type': 0,
    'react/destructuring-assignment': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-indent': [2, 2],
    'react/jsx-one-expression-per-line': 0
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src']
      }
    }
  }
};
