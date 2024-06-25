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
          <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center">
            {element.icon ? (
              <img src={element.icon} />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-md bg-zinc-50 dark:bg-slate-800">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.47984 36.0396L4.26825 3.75641C4.22824 2.69023 5.04575 1.78664 6.11061 1.72009L33.5697 0.00389615C34.6536 -0.0638476 35.5872 0.75991 35.655 1.84381C35.6575 1.88465 35.6588 1.92555 35.6588 1.96647V37.1447C35.6588 38.2307 34.7784 39.1111 33.6924 39.1111C33.663 39.1111 33.6335 39.1105 33.6042 39.1091L7.35663 37.9303C6.33439 37.8844 5.51821 37.0621 5.47984 36.0396Z"
                    fill="#FF4785"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M31.4109 0.13916L27.6318 0.375353L27.4475 4.80771C27.4446 4.87585 27.4656 4.94284 27.5069 4.99717C27.6048 5.12624 27.7888 5.15151 27.9178 5.0536L29.6396 3.74755L31.0938 4.89312C31.1483 4.93605 31.2162 4.95827 31.2855 4.95585C31.4475 4.9502 31.5741 4.81437 31.5685 4.65246L31.4109 0.13916ZM28.4697 14.9819C27.7779 15.5193 22.6247 15.8859 22.6247 15.1209C22.7336 12.2016 21.4266 12.0737 20.7005 12.0737C20.0107 12.0737 18.849 12.2822 18.849 13.8461C18.849 15.4397 20.5468 16.3394 22.5395 17.3955C25.3703 18.8956 28.7964 20.7112 28.7964 25.2799C28.7964 29.6588 25.2386 32.0777 20.7005 32.0777C16.0172 32.0777 11.9246 30.1829 12.3868 23.6138C12.5683 22.8424 18.5223 23.0257 18.5223 23.6138C18.4496 26.3245 19.0668 27.1218 20.6279 27.1218C21.826 27.1218 22.3705 26.4615 22.3705 25.3494C22.3705 23.6663 20.6016 22.6732 18.5667 21.5307C15.8113 19.9837 12.5683 18.1629 12.5683 13.9851C12.5683 9.8147 15.4364 7.03444 20.5553 7.03444C25.6742 7.03444 28.4697 9.7721 28.4697 14.9819Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
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
          <div className="text-black dark:text-slate-400">
            {element.description}
          </div>
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
            {'weeklyViews' in element &&
              humanFormat(element.weeklyViews || 0, {
                decimals: 1,
                separator: '',
              })}
          </div>
          <div className="text-xs text-zinc-600 dark:text-slate-400">
            {isRecipe ? 'Views' : 'Downloads'}
          </div>
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
              <div className="ml-2 text-black dark:text-slate-400">
                + {element.authors.slice(3).length}
              </div>
            )}
          </div>
        )}
      </div>
    </Comp>
  );
};
