import Link from 'next/link';
import type { FC, ReactNode } from 'react';

export function getHref({ href: hrefIn, indexPagePath }: AProps) {
  const isExternal = hrefIn?.startsWith('http');
  if (isExternal ?? !hrefIn) {
    return hrefIn ?? '#';
  }

  let href = hrefIn
    // eslint-disable-next-line prefer-named-capture-group -- TODO: Fix regex with new eslint rules
    ?.replace(/^((?!http).*)\.mdx/, '$1/')
    .replace(/\/index\/$/, '/')
    // ../../release-7-6/docs/migration-guide.mdx#major-breaking-changes -> ../../docs/7/migration-guide#major-breaking-changes
    // eslint-disable-next-line prefer-named-capture-group -- TODO: Fix regex with new eslint rules
    .replace(/^((?!http).*)(?:release-)(\d+)-\d+\/docs(.*)/, '$1docs/$2$3');

  /**
   * The link hrefs are authored to match the file system, e.g. `../get-started/install.mdx`, but the
   * URL for that page is `/docs/get-started/install/`. So, we need to rewrite relative hrefs to
   * accommodate the change from file to directory in the route.
   * 
   * Index pages have a trailing slash, so the transformation doesn't require adjustment.
   */
  if (!indexPagePath) {
    href = href.replace(/^\.\.\//, '../../');
    href = href.replace(/^\.\//, '../');
  }

  return href;
}

interface AProps {
  children?: ReactNode;
  href?: string;
  indexPagePath?: string[] | null;
}

export const A: FC<AProps> = ({
  children,
  href: hrefIn,
  indexPagePath,
  ...rest
}) => {
  const href = getHref({ href: hrefIn, indexPagePath });

  return (
    <Link className="ui-text-blue-500" href={href} {...rest}>
      {children}
    </Link>
  );
};
