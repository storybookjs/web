import type { Tag, TagLinkType } from '../types';

export function buildTagLinks(tags: Tag[]): TagLinkType[] {
  return tags.map((tag) => ({
    name: tag.icon
      ? `${tag.icon} ${tag.displayName ?? ''}`
      : tag.displayName ?? 'Unknown',
    link: `/addons/tag/${tag.name}/`,
  }));
}
