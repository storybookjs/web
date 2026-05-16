export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const deployUrl = process.env.URL;
export const host = deployUrl
  ? `https://${deployUrl}`
  : 'http://localhost:3001';
