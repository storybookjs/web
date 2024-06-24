import Image from 'next/image';
import { CopyIcon, VerifiedIcon } from '@storybook/icons';
import humanFormat from 'human-format';

export function AddonHero({ addon }: { addon: Addon }) {
  return (
    <div className="mb-12 flex justify-between border-b border-zinc-300 pb-12 dark:border-b-slate-700">
      <div className="flex flex-col gap-8 md:flex-row">
        {addon.icon && (
          <div className="relative h-20 w-20">
            <Image src={addon.icon} alt={addon.displayName || ''} fill={true} />
          </div>
        )}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{addon.displayName}</h1>
            {addon.verified &&
              ['official', 'integrators'].includes(addon.verified) &&
              addon.status !== 'deprecated' && (
                <VerifiedIcon className="text-blue-500" />
              )}
          </div>
          <p className="mb-4">{addon.description}</p>
          <button className="flex cursor-pointer items-center gap-4 rounded bg-zinc-100 px-4 py-2">
            npm install {addon.name} <CopyIcon />
          </button>
        </div>
      </div>
      <div className="hidden lg:block">
        <div className="flex flex-col pr-8">
          <div className="text-3xl text-blue-400">
            {humanFormat(addon.weeklyDownloads || 0, {
              decimals: 1,
              separator: '',
            })}
          </div>
          <div className="text-md">Downloads per week</div>
        </div>
      </div>
    </div>
  );
}
