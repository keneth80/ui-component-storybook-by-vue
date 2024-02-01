module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        'vue/setup-compiler-macros': true
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        '@vue/typescript/recommended',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    ignorePatterns: ['build', 'dist', 'public'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-underscore-dangle': 'error',
        'func-names': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'vue/no-deprecated-slot-attribute': 'off',
        'no-unused-vars': 'off', // ['error', {vars: 'all', args: 'after-used', ignoreRestSiblings: false}],
        'vue/no-v-text-v-html-on-component': 'error',
        'vue/no-unused-components': 'warn',
        'vue/require-v-for-key': 'error',
        'vue/no-deprecated-events-api': 'error',
        'vue/v-on-event-hyphenation': 'warn',
        'vue/attribute-hyphenation': 'off',
        'vue/script-setup-uses-vars': 'error',
        'vue/no-dupe-keys': 'off',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-unused-expressions': 'warn',
        '@typescript-eslint/no-for-in-array': 'error',
        'max-len': [
            'error',
            {
                code: 150,
                ignoreComments: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true
            }
        ], // prettier의 printWidth 옵션 대신 사용
        'prettier/prettier': [
            'error',
            {
                printWidth: 150,
                tabWidth: 4,
                semi: true,
                singleQuote: true,
                bracketSpacing: false,
                arrowParens: 'always',
                trailingComma: 'none',
                endOfLine: 'auto'
            }
        ]
    }
};
