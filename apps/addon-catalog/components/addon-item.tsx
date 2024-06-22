import humanFormat from 'human-format';
import { cn } from '@repo/utils';
import Image from 'next/image';
import { VerifiedIcon } from '@storybook/icons';
import Link from 'next/link';

interface AddonItemProps {
  icon?: string;
  name?: string;
  displayName?: string;
  description?: string;
  weeklyDownloads?: number;
  authors: Author[];
  orientation?: 'vertical' | 'horizontal';
  appearance?: 'official' | 'integrators' | 'community';
  verifiedCreator?: string;
  from?: {
    title?: string;
    link?: string;
  };
  status?: 'default' | 'essential' | 'deprecated';
}

export const AddonItem = ({
  icon,
  name,
  description,
  weeklyDownloads,
  authors,
  appearance,
  displayName,
  orientation,
  status,
}: AddonItemProps) => {
  return (
    <Link
      href={`/${name}`}
      className={cn(
        'flex rounded border border-zinc-300 p-6 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-blue-500',
        orientation === 'horizontal'
          ? 'flex-row justify-between'
          : 'flex-col justify-between',
      )}
    >
      <div
        className={cn(
          'flex',
          orientation === 'horizontal'
            ? 'flex-row items-center gap-4'
            : 'mb-8 flex-col gap-4',
        )}
      >
        <div className="relative h-16 w-16">
          {icon && <Image src={icon} alt="" fill={true} />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className="font-bold">{displayName ?? name}</div>
            {appearance &&
              ['official', 'integrators'].includes(appearance) &&
              status !== 'deprecated' && (
                <VerifiedIcon className="text-blue-500" />
              )}
          </div>
          <div className="">{description}</div>
        </div>
      </div>
      <div className={cn('flex items-center justify-between gap-12')}>
        <div className="flex flex-col">
          <div className="font-bold">
            {humanFormat(weeklyDownloads || 0, {
              decimals: 1,
              separator: '',
            })}
          </div>
          <div className="text-xs text-zinc-600">Downloads</div>
        </div>
        {authors && (
          <div className="flex items-center">
            {authors.slice(0, 3).map((author) => (
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
            {authors.length > 3 && (
              <div className="ml-2">+ {authors.slice(3).length}</div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};
