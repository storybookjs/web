// eslint-disable-next-line
import { remark } from 'remark';
import remarkHTML from 'remark-html';

import { absoluteLinks } from './absolute-links';

export function createMarkdownProcessor(absoluteLinkBase: string) {
  const processor = remark();

  if (absoluteLinkBase) {
    // @ts-expect-error - TODO: Fix types
    processor.use(absoluteLinks, {
      base: absoluteLinkBase,
    });
  }

  return processor.use(remarkHTML);
}
