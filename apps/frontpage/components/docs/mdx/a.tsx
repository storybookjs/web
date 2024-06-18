import Link from 'next/link';
import type { FC, ReactNode } from 'react';

interface AProps {
  children?: ReactNode;
  href?: string;
}

export const A: FC<AProps> = ({ children, href, ...rest }) => {
  const hrefWithoutExtension = href ? href.replace(/\.mdx/, '') : '';
  const isInternalLink = href?.includes('.mdx') ?? false;

  if (isInternalLink)
    return (
      <Link className="text-blue-500" href={hrefWithoutExtension} {...rest}>
        {children}
      </Link>
    );

  return (
    <a className="text-blue-500" href={href} {...rest}>
      {children}
    </a>
  );
};
