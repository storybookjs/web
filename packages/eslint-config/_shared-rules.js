// Shared rule overrides applied across all of this repo's ESLint configs.
// TODO: Remove these overrides once the underlying issues are resolved.
module.exports = {
  'import/no-default-export': 'off',
  'import/no-named-as-default': 'off',
  '@typescript-eslint/no-unsafe-call': 'off',
  '@typescript-eslint/no-unsafe-return': 'off',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-unnecessary-condition': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/no-non-null-assertion': 'off',
  'react/function-component-definition': 'off',
};
