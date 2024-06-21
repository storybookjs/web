import { LinkIcon } from '@storybook/icons';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type H3Props = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export function H4({ children, id }: H3Props) {
  return (
    <h4
      className="group relative mb-4 text-xl font-bold"
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
    </h4>
  );
}
