module.exports = {
    'env': {
        'es2021': true,
        'node': true,
    },
    'extends': [
        'plugin:react-hooks/recommended',
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
        },
        'sourceType': 'module',
    },
    /* eslint sort-keys: "error" */
    'rules': {
        'array-bracket-newline': ['error', 'consistent'],
        'array-bracket-spacing': ['error', 'never'],
        'array-element-newline': ['error', 'consistent'],
        'arrow-parens': ['error', 'as-needed'],
        'arrow-spacing': ['error', { 'after': true, 'before': true }],
        'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
        'comma-dangle': ['error', 'always-multiline'],
        'comma-spacing': ['error', { 'after': true, 'before': false }],
        'eol-last': ['error', 'always'],
        'eqeqeq': ['error'],
        'func-call-spacing': ['error', 'never'],
        'indent': ['error', 4, { 'MemberExpression': 1, 'SwitchCase': 1 }],
        'jsx-quotes': ['error', 'prefer-single'],
        'key-spacing': ['error', { 'beforeColon': false }],
        'keyword-spacing': ['error', { 'after': true }],
        'linebreak-style': ['error', 'windows'],
        'lines-between-class-members': ['error', 'always'],
        'newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 3 }],
        'no-extra-parens': ['error'],
        'no-multi-spaces': ['error'],
        'no-trailing-spaces': ['error'],
        'no-var': ['error'],
        'object-curly-spacing': ['error', 'always'],
        'prefer-arrow-callback': ['error'],
        'prefer-const': ['error'],
        'quotes': ['error', 'single'],
        'require-await': 'error',
        'semi': ['error', 'never'],
        'space-before-blocks': ['error'],
        'space-in-parens': ['error', 'never'],
        'space-infix-ops': ['error', { 'int32Hint': false }],
        'spaced-comment': ['error', 'always', { 'exceptions': ['-', '+'] }],
    },
}
