module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
  },
  // 'extends': 'google',
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
  },
  'rules': {
    'semi': ['error', 'always'], // נקודה ופסיק בסוף הקו
    'indent': ['error', 2, { 'SwitchCase': 1 }], // שרווחים במקום טאב
  },
};
