export function buildPathWithVersion(slug: string, version: string) {
  const parts = slug.split('/');
  parts.splice(2, 0, version);
  return parts.join('/');
};
