import Link from 'next/link';
import type { FC, ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- With an interface, we get this error in ./index: https://github.com/microsoft/TypeScript/issues/5711
type AProps = {
  children?: ReactNode;
  href?: string;
};

export const A: FC<AProps> = ({ children, href, ...rest }) => {
  // TODO: Confirm this doesn't cause issues outside of frontpage
  const isInternalLink = href?.includes('.mdx') ?? false;

  if (isInternalLink) {
    const hrefWithoutExtension = href ? href.replace(/\.mdx/, '') : '';
    return (
      <Link className="ui-text-blue-500" href={hrefWithoutExtension} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a className="ui-text-blue-500" href={href} {...rest}>
      {children}
    </a>
  );
};
