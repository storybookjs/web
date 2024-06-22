import type { ComponentProps, ReactNode } from 'react';

// TODO: Link?
// https://github.com/storybookjs/design-system/blob/master/src/components/Link.tsx
// eslint-disable-next-line jsx-a11y/anchor-has-content -- Temporary component, and it does have content
const Link = (props: { children: React.ReactNode }) => <a {...props} />;

interface TooltipMessageProps {
  title?: ReactNode;
  desc?: ReactNode;
  links?: ({ title: string } & Omit<ComponentProps<typeof Link>, 'children'>)[];
}

// @ts-expect-error - Temporary component
const MessageWrapper = (props) => <div {...props} />;
// padding: 15px;
// width: 280px;
// box-sizing: border-box;
// word-break: break-word;

// @ts-expect-error - Temporary component
const Message = (props) => <div {...props} />;
// color: ${color.darker};
// line-height: 18px;

// @ts-expect-error - Temporary component
const Title = (props) => <div {...props} />;
// font-weight: ${typography.weight.bold};

// @ts-expect-error - Temporary component
const Links = (props) => <div {...props} />;
// margin-top: 8px;
// text-align: center;

// > * {
//   margin: 0 8px;
//   font-weight: ${typography.weight.bold};
// }

export function TooltipMessage({
  title,
  desc,
  links,
  ...rest
}: TooltipMessageProps) {
  return (
    <MessageWrapper {...rest}>
      <Message>
        {title ? <Title>{title}</Title> : null}
        {desc ? <span>{desc}</span> : null}
      </Message>
      {links && links.length > 0 ? (
        <Links>
          {links.map(({ title: linkTitle, ...other }) => (
            <Link {...other} key={linkTitle}>
              {linkTitle}
            </Link>
          ))}
        </Links>
      ) : null}
    </MessageWrapper>
  );
}
