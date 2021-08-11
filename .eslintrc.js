module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es6: true
    },
    extends: [
        'eslint:recommended'
    ],
    overrides: [
        {
            files: ["**/*.ts", "**/*.tsx"],
            parser: '@typescript-eslint/parser',
            plugins: [
                '@typescript-eslint',
            ],
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
            ],
            rules: {
                '@typescript-eslint/no-non-null-assertion': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'off'
            },
        }
    ]
};