export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const vercelUrl = process.env.VERCEL_URL || process.env.VERCEL_BRANCH_URL;
export const host = vercelUrl
  ? `https://${vercelUrl}`
  : 'http://localhost:3001';
