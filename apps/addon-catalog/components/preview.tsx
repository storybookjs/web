import humanFormat from 'human-format';
import { cn } from '@repo/utils';
import Image from 'next/image';
import { VerifiedIcon } from '@storybook/icons';
import Link from 'next/link';

interface PreviewProps {
  element: Addon | Recipe;
  orientation: 'horizontal' | 'vertical';
  type: 'addon' | 'recipe';
}

export const Preview = ({ element, orientation, type }: PreviewProps) => {
  const isRecipe = type === 'recipe';
  const Comp = isRecipe ? 'a' : Link;

  return (
    <Comp
      href={`${isRecipe ? '/recipes' : ''}/${element.name}`}
      className={cn(
        'flex justify-between rounded border border-zinc-300 p-6 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-blue-500 dark:border-slate-800 dark:hover:border-blue-500',
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
        {!isRecipe && (
          <div className="relative h-16 w-16 flex-shrink-0">
            {element.icon && <img src={element.icon} alt={element.name} />}
          </div>
        )}
        {'accentColor' in element && (
          <div
            className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md"
            style={{ backgroundColor: element.accentColor || 'transparent' }}
          >
            {element.icon && (
              <img
                src={element.icon}
                alt={element.name}
                className="h-10 w-10"
              />
            )}
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <div className="font-bold">
              {element.displayName ?? element.name}
            </div>
            {'verified' in element &&
              element.verified &&
              ['official', 'integrators'].includes(element.verified) &&
              element.status !== 'deprecated' && (
                <VerifiedIcon className="text-blue-500" />
              )}
          </div>
          <div className="">{element.description}</div>
        </div>
      </div>
      <div className="flex flex-shrink-0 items-center justify-between gap-12">
        <div className="flex flex-col">
          <div className="font-bold">
            {'weeklyDownloads' in element &&
              humanFormat(element.weeklyDownloads || 0, {
                decimals: 1,
                separator: '',
              })}
          </div>
          <div className="text-xs text-zinc-600">Downloads</div>
        </div>
        {element.authors && (
          <div className="flex items-center">
            {element.authors.slice(0, 3).map((author) => (
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
            {element.authors.length > 3 && (
              <div className="ml-2">+ {element.authors.slice(3).length}</div>
            )}
          </div>
        )}
      </div>
    </Comp>
  );
};
