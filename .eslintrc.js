module.exports = {
    parser: 'babel-eslint',
    // commonjs: true,
    env: {
      browser: true,
      commonjs: true,
      es6: true,
      node: true,
    },
    extends: ['airbnb'],
    // installedESLint: true,
    parserOptions: {
      ecmaVersion: 8,
      ecmaFeatures: {
        experimentalObjectRestSpread: true,
      },
      sourceType: 'module',
      allowImportExportEverywhere: true,
    },
    plugins: [],
    rules: {
      'jsx-a11y/anchor-is-valid': 0,
      'react/jsx-filename-extension': 0,
      'prefer-destructuring': ["error", {
        "array": false,
        "object": true
      }],
      'react/prop-types': 0,
      indent: ['error', 2, { SwitchCase: 1 }],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      camelcase: 0,
      'arrow-parens': ['error', 'as-needed'],
      // 'import/no-unresolved': [2, { ignore: ['^/'] }],
      // 'import/no-extraneous-dependencies': 0,
      'forbid-prop-types': [0, { forbid: [] }],
      'no-underscore-dangle': [
        'error',
        {
          allow: ['ensureIndex', '_id', '_schemaKeys', '_', '_typeMap', '_id'],
        },
      ],
      // 'import/extensions': 0,
      'new-cap': [
        'error',
        {
          capIsNewExceptions: [],
          newIsCapExceptions: [],
        },
      ],
      'no-param-reassign': ['error', { props: false }],
      'no-restricted-syntax': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'no-warning-comments': [
        1,
        { terms: ['fixme', 'todo', 'hack'], location: 'start' },
      ],
      'no-unused-expressions': 0,
      // 'chai-friendly/no-unused-expressions': 2,
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
      'global-require': 0,
      'no-warning-comments': 0,
      'class-methods-use-this': 0,
    },
    globals: {
      Assets: true,
    },
  };