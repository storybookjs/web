export const ADDON_FRAGMENT = `
  type: __typename
  id: name
  name
  displayName
  description
  icon
  authors {
    id: username
    avatarUrl: gravatarUrl
    name: username
  }
  weeklyDownloads
  appearance: verified
  verifiedCreator
`;

export const RECIPE_FRAGMENT = `
  type: __typename
  id: name
  name
  displayName
  description
  icon
  accentColor
  authors {
    id: username
    avatarUrl: gravatarUrl
    name: username
  }
  views: weeklyViews
`;