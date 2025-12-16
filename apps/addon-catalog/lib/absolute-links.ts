import { resolve, format } from 'node:url';
import { rehype } from 'rehype';
import rehypeUrls from 'rehype-urls';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import type { Element } from 'hast';
import type { Root, Link, Image, HTML } from 'mdast';

interface Options {
  assetBase: string | null;
  base: string;
}

interface TransformOptions extends Options {
  isAsset?: boolean;
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
  { base, assetBase, isAsset }: TransformOptions = { base: '', assetBase: null },
) {
  if (link.startsWith('#')) {
    return link;
  }
  return resolve(isAsset && assetBase ? assetBase : base, link);
}

function absoluteLinksHtml(html: string, opts: Options) {
  const buf = rehype()
    .use(rehypeUrls, (url: unknown, node: unknown) => {
      const element = node as Element;
      return absoluteLink(format(url as string), {
        ...opts,
        isAsset: !!element.properties?.src,
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

  function transform(tree: Root) {
    // https://github.com/syntax-tree/mdast#nodes
    visit(tree, ['link', 'image', 'html'], (node) => {
      if (!node) return;

      if (node.type === 'link') {
        const linkNode = node as Link;
        linkNode.url = absoluteLink(linkNode.url, opts);
      } else if (node.type === 'html') {
        const htmlNode = node as HTML;
        htmlNode.value = absoluteLinksHtml(htmlNode.value, opts);
      } else if (node.type === 'image') {
        const imageNode = node as Image;
        imageNode.url = absoluteLink(imageNode.url, {
          ...opts,
          isAsset: true,
        });
      }
    });
  }
}
