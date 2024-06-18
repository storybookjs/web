import { LinkIcon } from '@storybook/icons';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type H1Props = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;
export function H1({ children, id }: H1Props) {
  return (
    <h1
      className="relative mb-6 mt-0 text-4xl font-bold"
      data-docs-heading
      id={id}
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
    </h1>
  );
}
