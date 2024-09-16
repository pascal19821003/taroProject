module.exports = {
  root: true,
  // extends: '@react-native',
  extends: ["taro/react"],

  rules: {
    'prettier/prettier': 'on',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 'import/no-unresolved': 'error',
    // 'import/order': ['error', { 'newlines-between': 'always' }],
    // "no-unused-vars": "off",
    // "@typescript-eslint/no-unused-vars": "off",
    // "import/order": "off",

    '@typescript-eslint/no-unused-vars': 'off',
    'react-native/no-inline-styles': 'off',
    'no-trailing-spaces': 'off',
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off" 
  },
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  ignorePatterns: ['node_modules/', 'dist/'],
};
