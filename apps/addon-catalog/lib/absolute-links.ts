import { resolve, format } from 'node:url';
import { rehype } from 'rehype';
import rehypeUrls from 'rehype-urls';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

interface Options {
  assetBase: string | null;
  base: string;
}

function assetUrl(repositoryUrl: string | null) {
  if (!repositoryUrl) return repositoryUrl;

  const repositoryRegex = /github\.com\/(?:.+\/.+)\//;
  const parseResult = repositoryRegex.exec(repositoryUrl);

  if (parseResult?.[1]) {
    const repository = parseResult[1];
    return `https://raw.githubusercontent.com/${repository}/HEAD/`;
  }

  return repositoryUrl;
}

function absoluteLink(
  link: string,
  // @ts-expect-error - TODO: Fix types
  { base, assetBase, isAsset }: Options & { isAsset?: boolean } = {},
) {
  if (link.startsWith('#')) {
    return link;
  }
  // @ts-expect-error - TODO: Fix types
  return resolve(isAsset ? assetBase : base, link);
}

function absoluteLinksHtml(html: string, opts: Options) {
  const buf = rehype()
    // @ts-expect-error - TODO: Fix types
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- TODO: Fix types
    .use(rehypeUrls, (url, node) => {
      return absoluteLink(format(url as string), {
        ...opts,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- TODO: Fix types
        isAsset: node.properties.src,
      });
    })
    .use(rehypeStringify, { closeSelfClosing: true })
    .processSync(html);

  return String(buf)
    .replace('<html><head></head><body>', '')
    .replace('</body></html>', '\n');
}

export function absoluteLinks(opts: Options) {
  opts.assetBase = assetUrl(opts.base);

  return transform;

  // @ts-expect-error - TODO: Fix types
  function transform(tree) {
    // https://github.com/syntax-tree/mdast#nodes
    visit(tree, ['link', 'image', 'html'], visitor);

    // @ts-expect-error - TODO: Fix types
    function visitor(node) {
      if (!node) return;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- TODO: Fix types
      switch (node.type) {
        case 'link': {
          // eslint-disable-next-line -- TODO: Fix types
          node.url = absoluteLink(node.url, opts);
          return;
        }
        case 'html': {
          // eslint-disable-next-line -- TODO: Fix types
          node.value = absoluteLinksHtml(node.value, opts);
          return;
        }
        case 'image': {
          // eslint-disable-next-line -- TODO: Fix types
          node.url = absoluteLink(node.url, {
            ...opts,
            isAsset: true,
          });
          return;
        }
        default:
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access -- TODO: Fix types
          throw new Error(`Unexpected: ${node.type}`);
      }
    }
  }
}
