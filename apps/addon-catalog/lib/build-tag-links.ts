// TODO: Find better place for this type
interface Tag {
  displayName: string;
  icon?: string;
  name: string;
}

export function buildTagLinks(tags: Tag[]) {
  return tags.map((tag) => ({
    name: tag.icon ? `${tag.icon} ${tag.displayName}` : tag.displayName,
    link: `/addons/tag/${tag.name}/`,
  }));
}
