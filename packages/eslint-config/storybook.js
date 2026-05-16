const { resolve } = require('node:path');
const sharedRules = require('./_shared-rules');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * typescript packages.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    'plugin:storybook/recommended',
    'plugin:mdx/recommended',
    ...[
      '@vercel/style-guide/eslint/node',
      '@vercel/style-guide/eslint/typescript',
      '@vercel/style-guide/eslint/browser',
      '@vercel/style-guide/eslint/react',
    ].map(require.resolve),
  ],
  parserOptions: {
    project,
  },
  plugins: ['only-warn'],
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  rules: {
    ...sharedRules,
    'storybook/default-exports': 'off', // No longer true with CSF Next
  },
};
