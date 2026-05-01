interface TagInput {
  name: string;
  displayName?: string;
  icon?: string | null;
}

export interface TagLink {
  link: string;
  name: string;
}

export function buildTagLinks(
  tags: TagInput[],
  { basePath }: { basePath: string },
): TagLink[] {
  return tags.map((tag) => ({
    name: tag.icon
      ? `${tag.icon} ${tag.displayName ?? ''}`
      : tag.displayName ?? 'Unknown',
    link: `${basePath}/${tag.name}/`,
  }));
}
