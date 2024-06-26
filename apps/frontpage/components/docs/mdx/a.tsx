import Link from 'next/link';
import type { FC, ReactNode } from 'react';

interface AProps {
  children?: ReactNode;
  href?: string;
}

export const A: FC<AProps> = ({ children, href: hrefIn, ...rest }) => {
  const href = hrefIn
    ?.replace(/^((?!http).*)\.mdx/, '$1')
    // ../../release-7-6/docs/migration-guide.mdx#major-breaking-changes -> ../../docs/7/migration-guide#major-breaking-changes
    .replace(/^((?!http).*)(?:release-)(\d+)-\d+\/docs(.*)/, '$1docs/$2$3');

  return (
    <a className="ui-text-blue-500" href={href} {...rest}>
      {children}
    </a>
  );
};
