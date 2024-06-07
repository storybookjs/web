import { LinkIcon } from '@storybook/icons';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type H2Props = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export function H2({ children, id }: H2Props) {
  return (
    <h2
      className="group relative mb-6 mt-0 text-2xl font-bold"
      data-docs-heading
    >
      <div className="absolute -translate-y-24" id={id} />
      <a
        className="text-black transition-colors duration-200 group-hover:text-blue-500 dark:text-white"
        href={`#${id}`}
      >
        {children}
        <span className="ml-2 inline-block opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <LinkIcon />
        </span>
      </a>
    </h2>
  );
}
