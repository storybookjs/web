import { LinkIcon } from '@storybook/icons';
import {
  createElement,
  type FC,
  type DetailedHTMLProps,
  type HTMLAttributes,
} from 'react';
import { cn } from '@repo/utils';

type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & {
  level: 1 | 2 | 3 | 4;
};
const Heading: FC<HeadingProps> = ({ children, className, id, level }) => {
  const HeadingComponent =
    {
      1: 'h1',
      2: 'h2',
      3: 'h3',
      4: 'h4',
    }[level] || 'h1';

  return createElement(
    HeadingComponent,
    {
      className: cn(
        'ui-group ui-relative ui-font-bold target:ui-scroll-mt-40 md:target:ui-scroll-mt-24',
        className,
      ),
      'data-docs-heading': true,
      id,
    },
    <>
      <div className="ui-absolute -ui-translate-y-24" />
      <a
        className="ui-text-black ui-transition-colors ui-duration-200 group-hover:ui-text-blue-500 dark:ui-text-white"
        href={`#${id ?? ''}`}
      >
        {children}
        <span className="ui-ml-2 ui-inline-block ui-opacity-0 ui-transition-opacity ui-duration-200 group-hover:ui-opacity-100">
          <LinkIcon />
        </span>
      </a>
    </>,
  );
};

export const H1: FC<Omit<HeadingProps, 'level'>> = (props) => {
  return (
    <Heading className="ui-mb-6 ui-mt-0 ui-text-4xl" level={1} {...props} />
  );
};

export const H2: FC<Omit<HeadingProps, 'level'>> = (props) => {
  return (
    <Heading className="ui-mb-6 ui-mt-10 ui-text-2xl" level={2} {...props} />
  );
};

export const H3: FC<Omit<HeadingProps, 'level'>> = (props) => {
  return (
    <Heading className="ui-mb-4 ui-mt-10 ui-text-xl" level={3} {...props} />
  );
};

export const H4: FC<Omit<HeadingProps, 'level'>> = (props) => {
  return <Heading className="ui-mb-4 ui-text-lg" level={4} {...props} />;
};
