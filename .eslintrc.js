module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
  },
  'rules': {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'react/destructuring-assignment': 'off',
    'no-nested-ternary': 'off',
    'object-curly-newline': 'off'
  },
  'globals': {
    "fetch": false
  }
}