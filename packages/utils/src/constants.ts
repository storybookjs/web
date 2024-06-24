export const addonFragment = `
  type: __typename
  name
  displayName
  description
  icon
  authors {
    username
    gravatarUrl
    username
  }
  weeklyDownloads
  verified
  verifiedCreator
`;

export const recipeFragment = `
  type: __typename
  name
  displayName
  description
  icon
  accentColor
  authors {
    username
    gravatarUrl
    username
  }
  weeklyViews
`;
