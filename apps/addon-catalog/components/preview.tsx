/* eslint-disable @next/next/no-img-element -- We can't know where the images are from */
import { humanFormat } from 'human-format';
import { cn } from '@repo/utils';
import Image from 'next/image';
import { StorybookIcon, VerifiedIcon } from '@storybook/icons';
import Link from 'next/link';
import type { Addon, Recipe } from '../types';

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
      href={`${isRecipe ? '/recipes' : ''}/${element.name ?? ''}`}
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
          <div className="relative flex items-center justify-center flex-shrink-0 w-16 h-16">
            {element.icon ? (
              <div
                style={{ backgroundImage: `url('${element.icon}')` }}
                className="w-16 h-16 bg-center bg-no-repeat bg-contain"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full rounded-md bg-zinc-50 dark:bg-slate-800">
                <StorybookIcon className="h-10 w-10 text-[#FF4785]" />
              </div>
            )}
          </div>
        )}
        {'accentColor' in element && (
          <div
            className="relative flex items-center justify-center flex-shrink-0 w-16 h-16 rounded-md"
            style={{ backgroundColor: element.accentColor ?? 'transparent' }}
          >
            {element.icon ? (
              <img
                src={element.icon}
                alt={element.name}
                className="w-10 h-10"
              />
            ) : null}
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
            element.status !== 'deprecated' ? (
              <VerifiedIcon className="text-blue-500" />
            ) : null}
          </div>
          <div className="text-black dark:text-slate-400">
            {element.description}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between flex-shrink-0 gap-12">
        <div className="flex flex-col">
          <div className="font-bold">
            {'weeklyDownloads' in element &&
              humanFormat(element.weeklyDownloads ?? 0, {
                decimals: 0,
                separator: '',
              })}
            {'weeklyViews' in element &&
              humanFormat(element.weeklyViews ?? 0, {
                decimals: 0,
                separator: '',
              })}
          </div>
          <div className="text-xs text-zinc-600 dark:text-slate-400">
            {isRecipe ? 'Views' : 'Downloads'}
          </div>
        </div>
        {element.authors ? (
          <div className="flex items-center">
            {element.authors.slice(0, 3).map((author) => (
              <div
                key={author.username}
                className="relative w-8 h-8 -ml-2 overflow-hidden rounded-full"
              >
                {author.gravatarUrl ? (
                  <Image
                    src={`https:${author.gravatarUrl}`}
                    alt={author.username || ''}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : null}
              </div>
            ))}
            {element.authors.length > 3 && (
              <div className="ml-2 text-black dark:text-slate-400">
                + {element.authors.slice(3).length}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </Comp>
  );
};
