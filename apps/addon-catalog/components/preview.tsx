import humanFormat from 'human-format';
import { cn } from '@repo/utils';
import Image from 'next/image';
import { VerifiedIcon } from '@storybook/icons';
import Link from 'next/link';

interface AddonItemProps
  extends Pick<
      Addon,
      'name' | 'authors' | 'description' | 'displayName' | 'icon' | 'status'
    >,
    Partial<Pick<Addon, 'verified' | 'verifiedCreator' | 'weeklyDownloads'>> {
  from?: {
    title?: string;
    link?: string;
  };
  orientation?: 'vertical' | 'horizontal';
}

export const Preview = ({
  authors,
  description,
  displayName,
  icon,
  name,
  orientation,
  status,
  verified,
  weeklyDownloads,
}: AddonItemProps) => {
  return (
    <Link
      href={`/${name}`}
      className={cn(
        'flex justify-between rounded border border-zinc-300 p-6 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-blue-500',
        orientation === 'horizontal'
          ? 'flex-col lg:flex-row lg:gap-8'
          : 'flex-col',
      )}
    >
      <div
        className={cn(
          'flex gap-4',
          orientation === 'horizontal'
            ? 'mb-8 flex-col lg:mb-0 lg:flex-row lg:items-center'
            : 'mb-8 flex-col',
        )}
      >
        <div className="relative h-16 w-16 flex-shrink-0">
          {icon && <Image src={icon} alt="" fill={true} />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className="font-bold">{displayName ?? name}</div>
            {verified &&
              ['official', 'integrators'].includes(verified) &&
              status !== 'deprecated' && (
                <VerifiedIcon className="text-blue-500" />
              )}
          </div>
          <div className="">{description}</div>
        </div>
      </div>
      <div className="flex flex-shrink-0 items-center justify-between gap-12">
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
                key={author.username}
                className="relative -ml-2 h-8 w-8 overflow-hidden rounded-full"
              >
                {author.gravatarUrl && (
                  <Image
                    src={`https:${author.gravatarUrl}`}
                    alt={author.username || ''}
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
