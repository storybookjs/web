export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const vercelUrl = process.env.VERCEL_URL || process.env.VERCEL_BRANCH_URL;
export const host = vercelUrl
  ? `https://${vercelUrl}`
  : 'http://localhost:3001';

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