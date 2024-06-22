import { ComponentProps } from 'react';
import humanFormat from 'human-format';
import Link from 'next/link';

import { AvatarList } from '@repo/ui';
import emptySVG from '../images/recipe-empty.svg';
import { IntegrationImage } from './integration-image';
import { VerifiedBadge } from './verified-badge';

type Orientation = 'vertical' | 'horizontal';

interface Author {
  id: string;
  name?: string;
  avatarUrl?: string;
}

interface RecipeItemProps {
  icon?: string;
  accentColor?: string;
  name?: string;
  displayName?: string;
  description?: string;
  views?: number;
  orientation?: Orientation;
  isLoading?: boolean;
  from?: {
    title: string;
    link: string;
  };
  authors?: Author[];
}

const RecipeItemWrapper = (props: {
  children?: React.ReactNode;
  orientation: Orientation;
}) => <div {...props} />;
// ${hoverEffect}
// display: flex;
// flex-direction: column;
// padding: ${spacing.padding.medium}px ${spacing.padding.medium}px 0;
// text-decoration: none;
// position: relative;

// @media (min-width: ${breakpoint * 1.5}px) {
//   padding: ${spacing.padding.medium}px;

//   ${(props) =>
//     props.orientation === 'horizontal' &&
//     `
//       flex-direction: row;
//       align-items: center;
//     `}
// }

const ClickIntercept = (props: any) => <Link {...props} />;
// position: absolute;
// top: 0;
// left: 0;
// right: 0;
// bottom: 0;
// z-index: 1;

const Image = (
  props: ComponentProps<typeof IntegrationImage> & {
    isLoading?: boolean;
    orientation?: Orientation;
  },
) => <IntegrationImage {...props} />;
// flex: none;
// width: 48px;
// height: 48px;

// ${(props) =>
//   props.isLoading &&
//   css`
//     ${inlineGlow}
//   `}

// @media (min-width: ${breakpoint * 1.5}px) {
//   width: 64px;
//   height: 64px;

//   ${(props: any) => props.orientation === 'vertical' && `margin-bottom: 16px;`}
// }

const ImageLoading = (props: { orientation?: Orientation }) => (
  // @ts-ignore
  <div {...props} />
);
// flex: none;
// width: 48px;
// height: 48px;
// margin-right: ${spacing.padding.medium}px;
// background-size: contain;
// background-position: center;
// background-repeat: no-repeat;
// ${inlineGlow}

// @media (min-width: ${breakpoint * 1.5}px) {
//   width: 64px;
//   height: 64px;

//   ${(props: any) => props.orientation === 'vertical' && `margin-bottom: 16px;`}
// }

const TextContainer = (props: {
  children?: React.ReactNode;
  orientation: Orientation;
}) => <div {...props} />;
// margin-left: ${spacing.padding.medium}px;

// @media (min-width: ${breakpoint * 1.5}px) {
//   ${({ orientation }) =>
//     orientation === 'vertical' &&
//     css`
//       margin-top: 16px;
//       margin-left: 0px;
//     `}
// }

const Title = (props: { children?: React.ReactNode; isLoading?: boolean }) => (
  <div {...props} />
);
// font-weight: ${typography.weight.bold};
// font-size: ${typography.size.s3}px;
// line-height: ${typography.size.m2}px;
// color: ${color.darker};
// display: flex;
// align-items: center;
// position: relative;

// ${(props) =>
//   props.isLoading &&
//   css`
//     line-height: ${typography.size.m1}px;
//     span {
//       ${inlineGlow}
//       margin-bottom: 8px;
//     }
//   `}

const Description = (props: {
  children?: React.ReactNode;
  isLoading?: boolean;
}) => <div {...props} />;
// font-size: ${typography.size.s2}px;
// line-height: ${typography.size.m1}px;
// color: ${color.darkest};
// position: relative;

// ${(props) =>
//   props.isLoading &&
//   css`
//     line-height: ${typography.size.s3}px;
//     span {
//       ${inlineGlow}
//     }
//   `}

const RecipeInfo = (props: {
  children?: React.ReactNode;
  orientation: Orientation;
}) => <div {...props} />;
// display: flex;
// align-items: flex-start;
// word-break: break-word;

// @media (min-width: ${breakpoint * 1.5}px) {
//   ${(props) =>
//     props.orientation === 'horizontal' &&
//     `
//       align-items: center;
//       margin-right: ${spacing.padding.large}px;
//     `}

//   ${(props) =>
//     props.orientation === 'vertical' &&
//     `
//       display: block;
//       margin-bottom: ${spacing.padding.medium}px;
//     `}
// }

const Spacer = (props: any) => <div {...props} />;
// border-top: 1px solid ${color.border};
// margin-top: ${spacing.padding.large}px;

// @media (min-width: ${breakpoint * 1.5}px) {
//   flex: 1 1 auto;
//   min-width: 0;
//   margin: 0;
//   border: 0;
// }

const Meta = (props: any) => <div {...props} />;
// display: flex;
// align-items: center;
// justify-content: space-between;

// padding-top: 16px;
// padding-bottom: 16px;

// @media (min-width: ${breakpoint * 1.5}px) {
//   padding: 0;
// }

// TODO: https://github.com/storybookjs/design-system/blob/master/src/components/Cardinal.tsx
const Cardinal = (props: any) => <div {...props} />;

const Stats = (props: any) => <Cardinal {...props} />;
// padding: 0;
// margin-right: ${spacing.padding.large}px;
// min-width: 72px;

const Authors = (props: any) => <AvatarList {...props} />;
// min-width: 95.5px;

export const RecipeItem = ({
  icon = emptySVG,
  accentColor = '#ca8fff',
  name,
  displayName,
  description,
  views = 0,
  orientation = 'horizontal',
  isLoading,
  from,
  authors,
  ...props
}: RecipeItemProps) => (
  <RecipeItemWrapper orientation={orientation} {...props}>
    {!isLoading && (
      <ClickIntercept state={{ from }} href={`/recipes/${name}/`} />
    )}
    <RecipeInfo orientation={orientation}>
      {isLoading ? (
        <ImageLoading orientation={orientation} />
      ) : (
        // @ts-expect-error - TODO: This should have a name prop?
        <Image
          orientation={orientation}
          isLoading={isLoading}
          icon={icon && icon !== '' ? icon : emptySVG}
          hideDropShadow
          accent={accentColor}
        />
      )}

      <TextContainer orientation={orientation}>
        <Title isLoading={isLoading}>
          <span>
            {isLoading ? 'loading' : `How to setup ${displayName || name}`}
            {!isLoading && <VerifiedBadge appearance="official" />}
          </span>
        </Title>
        <Description isLoading={isLoading}>
          <span>
            {isLoading ? 'loading description of recipe' : description}
          </span>
        </Description>
      </TextContainer>
    </RecipeInfo>
    <Spacer />
    <Meta>
      <Stats
        size="small"
        count={
          isLoading
            ? undefined
            : humanFormat(views || 0, {
                decimals: 1,
                separator: '',
              })
        }
        text={isLoading ? undefined : 'Recipe views'}
        noPlural
        isLoading={isLoading}
      />
      <Authors
        users={isLoading ? undefined : authors || []}
        isLoading={isLoading}
      />
    </Meta>
  </RecipeItemWrapper>
);
