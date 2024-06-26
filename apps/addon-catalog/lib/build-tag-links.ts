export function buildTagLinks(tags: Tag[]): TagLinkType[] {
  return tags.map((tag) => ({
    name: tag.icon
      ? `${tag.icon} ${tag.displayName}`
      : tag.displayName || 'Unknown',
    link: `/tag/${tag.name}/`,
  }));
}
