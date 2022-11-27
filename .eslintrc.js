module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@next/next/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'simple-import-sort', 'unused-imports', 'chakra-ui'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: true,
        shorthandLast: true,
      },
    ],
    'chakra-ui/props-order': 'off',
    'chakra-ui/props-shorthand': [
      'error',
      {
        noShorthand: true,
        applyToAllComponents: true,
      },
    ],
    'chakra-ui/require-specific-component': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'unused-imports/no-unused-imports-ts': 'error',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@chakra-ui/react',
            message:
              'To reduce bundle size, import from the chakra packages directly, see https://github.com/chakra-ui/chakra-ui/issues/4975#issuecomment-1169169218',
          },
          {
            name: 'lodash',
            message:
              "To reduce bundle size import only the function required from lodash. Example: import get from 'lodash/get'",
          },
        ],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
