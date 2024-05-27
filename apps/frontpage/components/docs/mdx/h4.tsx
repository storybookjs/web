import { LinkIcon } from '@storybook/icons';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type H3Props = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export function H4({ children, id }: H3Props) {
  return (
    <h4 className="relative text-xl mb-4 font-bold group" data-docs-heading>
      <div className="absolute -translate-y-24" id={id} />
      <a
        className="text-black dark:text-white group-hover:text-blue-600 transition-colors duration-200"
        href={`#${id}`}
      >
        {children}
        <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <LinkIcon />
        </span>
      </a>
    </h4>
  );
}
