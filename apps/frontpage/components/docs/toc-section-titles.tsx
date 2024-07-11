'use client';

import { TreeProps, getVersion, latestVersion } from '@repo/utils';
import { useSelectedLayoutSegment } from 'next/navigation';

export function TOCSectionTitles({
  listOfTrees,
}: {
  listOfTrees: TreeProps[];
}) {
  const segment = useSelectedLayoutSegment();
  const slug: string[] = segment ? segment.split('/') : [];
  const activeVersion = getVersion(slug);
  const selectedTree = listOfTrees.find((t) => t.name === activeVersion.id);
  const tree = selectedTree?.children;

  function getTocSectionTitles() {
    const title: string[] = [];

    function buildTitle(items: TreeProps[], pathPartIndex: number) {
      const item = items.find(
        (item) =>
          item.name.replace('.mdx', '') === (slug as string[])[pathPartIndex],
      );
      if (item) {
        title.push(item.sidebar?.title || item.title);
        if (item.children) {
          buildTitle(item.children, pathPartIndex + 1);
        }
      }
    }

    if (slug && tree)
      buildTitle(tree, activeVersion.id === latestVersion.id ? 0 : 1);

    return title.join(' » ');
  }

  const tocSectionTitles = getTocSectionTitles();

  return tocSectionTitles ? (
    <span hidden id="toc-section-titles">{`Docs » ${tocSectionTitles}`}</span>
  ) : null;
}
