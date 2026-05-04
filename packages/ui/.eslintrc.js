module.exports = {
  extends: ['@repo/eslint-config/react.js', '@repo/eslint-config/storybook'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@repo/utils',
            importNames: ['cn'],
            message:
              "Inside @repo/ui, import cn from './cn' (relative). It's configured with the 'ui-' Tailwind prefix; @repo/utils's cn is not, so class merging breaks.",
          },
        ],
      },
    ],
  },
};
