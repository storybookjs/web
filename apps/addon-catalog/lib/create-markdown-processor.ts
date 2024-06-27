// eslint-disable-next-line
import { remark } from 'remark';
import remarkGFM from 'remark-gfm';
import remarkHTML from 'remark-html';

import { absoluteLinks } from './absolute-links';

export function createMarkdownProcessor(absoluteLinkBase: string) {
  const processor = remark();

  if (absoluteLinkBase) {
    processor
      // @ts-expect-error - TODO: Fix types
      .use(absoluteLinks, {
        base: absoluteLinkBase,
      })
      .use(remarkGFM);
  }

  return processor.use(remarkHTML);
}
