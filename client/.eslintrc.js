module.exports = {
    "extends": ["eslint:recommended", "google", "plugin:react/recommended"],
    "plugins": [
        "react"
    ],
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "modules": true
        }
    },
    "rules": {
        "require-jsdoc": "off",
        "react/prop-types": "off",
        indent: ['error', 2, { SwitchCase: 1 }],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        camelcase: 0,
        'arrow-parens': ['error', 'as-needed'],
    }
};