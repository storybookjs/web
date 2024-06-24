import { LinkIcon } from '@storybook/icons';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { cn } from '@repo/utils';

type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & {
  level: 1 | 2 | 3 | 4;
};
function Heading({ children, className, id, level }: HeadingProps) {
  const Component = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';
  return (
    <Component
      className={cn('ui-group ui-relative ui-font-bold', className)}
      data-docs-heading
      id={id}
    >
      <div className="ui-absolute -ui-translate-y-24" id={id} />
      <a
        className="ui-text-black ui-transition-colors ui-duration-200 group-hover:ui-text-blue-500 dark:ui-text-white"
        href={`#${id}`}
      >
        {children}
        <span className="ui-ml-2 ui-inline-block ui-opacity-0 ui-transition-opacity ui-duration-200 group-hover:ui-opacity-100">
          <LinkIcon />
        </span>
      </a>
    </Component>
  );
}

export function H1(props: Omit<HeadingProps, 'level'>) {
  return (
    <Heading className="ui-mb-6 ui-mt-0 ui-text-4xl" level={1} {...props} />
  );
}

export function H2(props: Omit<HeadingProps, 'level'>) {
  return (
    <Heading className="ui-mb-6 ui-mt-10 ui-text-2xl" level={2} {...props} />
  );
}

export function H3(props: Omit<HeadingProps, 'level'>) {
  return (
    <Heading className="ui-mb-4 ui-mt-10 ui-text-xl" level={3} {...props} />
  );
}

export function H4(props: Omit<HeadingProps, 'level'>) {
  return <Heading className="ui-mb-4 ui-text-xl" level={4} {...props} />;
}
