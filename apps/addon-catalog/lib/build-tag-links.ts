export interface TagLinkType { link: string; name: string; };

export function buildTagLinks(tags: Tag[]): TagLinkType[] {
  return tags.map((tag) => ({
    name: tag.icon ? `${tag.icon} ${tag.displayName}` : tag.displayName,
    link: `/addons/tag/${tag.name}/`,
  }));
}
