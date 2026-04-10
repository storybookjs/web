import Link from 'next/link';
import { type DocsVersion, latestVersion } from '@repo/utils';
import type { FC, ReactNode } from 'react';

interface AProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  activeVersion?: DocsVersion;
  children?: ReactNode;
  isIndexPage: boolean;
  pagePath: string[];
}

export function processHref({
  activeVersion,
  href: hrefIn,
  isIndexPage,
  pagePath,
}: {
  activeVersion: DocsVersion;
  href: string;
  isIndexPage: boolean;
  pagePath: string[];
}): string {
   // Hash-only links should not be processed
  if (hrefIn.startsWith('#')) {
    return hrefIn;
  }

  const href = hrefIn
    // eslint-disable-next-line prefer-named-capture-group -- TODO: Fix regex with new eslint rules
    .replace(/^((?!http).*)\.mdx/, '$1')
    .replace(/\/index$/, '')
    // eslint-disable-next-line prefer-named-capture-group -- TODO: Fix regex with new eslint rules
    .replace(/^((?!http).*)(?:release-)(\d+)-\d+\/docs(.*)/, '$1$2$3');

  const pathWithoutVersion = pagePath.slice(1);

  // If not on an index page, start with the directory of the current page (not the page itself)
  const segments = isIndexPage
    ? [...pathWithoutVersion]
    : [...pathWithoutVersion.slice(0, -1)];

  const hrefParts = href.split('/');
  for (const part of hrefParts) {
    if (part === '.') {
      continue;
    } else if (part === '..') {
      segments.pop();
    } else {
      segments.push(part);
    }
  }

  const versionPrefix =
    activeVersion.id === latestVersion.id || hrefIn.includes('/release-')
      ? ''
      : `${activeVersion.inSlug ?? activeVersion.id}/`;

  return `/docs/${versionPrefix}${segments.join('/')}`;
}

export const A: FC<AProps> = ({
  activeVersion = latestVersion,
  children,
  href: hrefIn,
  isIndexPage,
  pagePath = [],
  ...rest
}) => {
  const isExternal = hrefIn?.startsWith('http');
  if (isExternal ?? !hrefIn) {
    return (
      <a className="ui-text-blue-500" href={hrefIn} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link
      className="ui-text-blue-500"
      href={processHref({ activeVersion, href: hrefIn, isIndexPage, pagePath })}
      {...rest}
    >
      {children}
    </Link>
  );
};
