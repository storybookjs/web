export const ADDON_FRAGMENT = `
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

export const RECIPE_FRAGMENT = `
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