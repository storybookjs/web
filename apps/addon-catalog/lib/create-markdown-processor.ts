 
import { remark } from 'remark';
import remarkGFM from 'remark-gfm';
import remarkHTML from 'remark-html';
import { absoluteLinks } from './absolute-links';

export function createMarkdownProcessor(absoluteLinkBase: string) {
  const processor = remark();

  if (absoluteLinkBase) {
    processor
      .use(absoluteLinks, {
        base: absoluteLinkBase,
        assetBase: null,
      })
      .use(remarkGFM);
  }

  return processor.use(remarkHTML);
}
