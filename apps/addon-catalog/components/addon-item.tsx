'use client';

import Link from 'next/link';
import humanFormat from 'human-format';
import { AvatarList } from '@repo/ui';
import { VerifiedBadge } from './verified-badge';
import { cn } from '@repo/utils';
import Image from 'next/image';

type Orientation = 'vertical' | 'horizontal';

interface AddonItemProps {
  icon?: string;
  name?: string;
  displayName?: string;
  description?: string;
  weeklyDownloads?: number;
  authors: Author[];
  orientation?: Orientation;
  appearance?: 'official' | 'integrators' | 'community';
  isLoading?: boolean;
  verifiedCreator?: string;
  from?: {
    title?: string;
    link?: string;
  };
  status?: 'default' | 'essential' | 'deprecated';
}

const Title = ({
  isLoading,
  ...props
}: {
  children?: React.ReactNode;
  isLoading?: boolean;
}) => <div {...props} />;
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

const Description = ({
  isLoading,
  ...props
}: {
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

const AddonInfo = ({
  orientation,
  ...props
}: {
  children?: React.ReactNode;
  orientation?: Orientation;
}) => <div {...props} />;
// display: flex;
// align-items: flex-start;
// word-break: break-word;

const Spacer = (props: any) => <div {...props} />;
// border-top: 1px solid ${color.border};
// margin-top: ${spacing.padding.large}px;

// @media (min-width: ${breakpoint * 1.5}px) {
//   flex: 1 1 auto;
//   min-width: 0;
//   margin: 0;
//   border: 0;
// }

// TODO: https://github.com/storybookjs/design-system/blob/master/src/components/Cardinal.tsx
const Cardinal = (props: any) => <div {...props} />;

const Stats = (props: any) => <Cardinal {...props} />;
// padding: 0;
// margin-right: ${spacing.padding.large}px;

const Authors = (props: any) => <AvatarList {...props} />;
// min-width: 95.5px;

export const AddonItem = ({
  icon,
  name,
  displayName,
  description,
  weeklyDownloads,
  authors,
  orientation,
  appearance,
  isLoading,
  verifiedCreator,
  from,
  status,
  ...props
}: AddonItemProps) => {
  return (
    <div className={cn('rounded border border-zinc-300 p-4')} {...props}>
      {!isLoading && <Link href={`/addons/${name}/`} />}
      <AddonInfo orientation={orientation}>
        <div className="relative h-16 w-16">
          {icon && <Image src={icon} alt="" fill={true} />}
        </div>
        <div>
          <Title isLoading={isLoading}>
            <span>{isLoading ? 'loading' : displayName || name}</span>
            {appearance &&
              ['official', 'integrators'].includes(appearance) &&
              status !== 'deprecated' && (
                <VerifiedBadge
                  appearance={appearance}
                  creator={verifiedCreator}
                />
              )}
          </Title>
          <Description isLoading={isLoading}>
            <span>
              {isLoading ? 'loading description of addon' : description}
            </span>
          </Description>
        </div>
      </AddonInfo>
      <Spacer />
      <div className={cn('flex')}>
        <Stats
          size="small"
          count={
            isLoading
              ? undefined
              : humanFormat(weeklyDownloads || 0, {
                  decimals: 1,
                  separator: '',
                })
          }
          text={isLoading ? undefined : 'Downloads'}
          noPlural
          isLoading={isLoading}
        />
        <div className="flex items-center">
          {authors?.slice(0, 3).map((author) => (
            <div
              key={author.id}
              className="relative -ml-2 h-8 w-8 overflow-hidden rounded-full"
            >
              {author.avatarUrl && (
                <Image
                  src={`https:${author.avatarUrl}`}
                  alt={author.name || ''}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
            </div>
          ))}
          <div className="ml-2">+ 8</div>
        </div>
      </div>
    </div>
  );
};
