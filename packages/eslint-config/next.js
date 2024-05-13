const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    '@vercel/style-guide/eslint/node',
    '@vercel/style-guide/eslint/typescript',
    '@vercel/style-guide/eslint/browser',
    '@vercel/style-guide/eslint/react',
    '@vercel/style-guide/eslint/next',
    'eslint-config-turbo',
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
      node: {
        extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  // add rules configurations here
  rules: {
    'import/no-default-export': 'off',
    // TODO: Remove this override once the issues are resolved
    '@typescript-eslint/no-unsafe-call': 'off',
    // TODO: Remove this override once the issues are resolved
    '@typescript-eslint/no-unsafe-return': 'off',
    // TODO: Remove this override once the issues are resolved
    '@typescript-eslint/no-unsafe-assignment': 'off',
    // TODO: Remove this override once the issues are resolved
    '@typescript-eslint/no-unnecessary-condition': 'off',
    // TODO: Remove this override once the issues are resolved
    '@typescript-eslint/explicit-function-return-type': 'off',
    // TODO: Remove this override once the issues are resolved
    '@typescript-eslint/no-empty-function': 'off',
    // TODO: Remove this override once the issues are resolved
    '@typescript-eslint/no-non-null-assertion': 'off',
    // TODO: Remove this override once the issues are resolved
    'react/function-component-definition': 'off',
  },
};
