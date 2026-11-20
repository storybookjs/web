import type { FC } from 'react';
import { cn } from '@repo/utils';
import { features } from './features';

/** Interaction tests and CI carry the loop, so they get the wide tiles */
const featured = new Set(['Interaction test behavior', 'Test in CI']);
const order = [
  'Interaction test behavior',
  'Spot test',
  'Visual test appearance',
  'Accessibility tests',
  'Coverage Reports',
  'Test in CI',
];

/**
 * Variant 2: bento with two wide featured tiles.
 * Borrows the Parallel test runs / Test only what changed panels on
 * /features/test: 20px radius, faint blue fill, white/10 outline and a
 * widely tracked uppercase label at the top of each panel.
 */
export const GridBento: FC = () => (
  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
    {order.map((name) => {
      const feature = features.find((f) => f.title === name);
      if (!feature) return null;
      const { icon, title, description } = feature;
      const isFeatured = featured.has(title);
      return (
        <li
          className={cn(
            'flex flex-col rounded-[20px] border border-white/10 bg-[rgba(130,172,255,0.05)] p-6',
            isFeatured && 'sm:col-span-2 lg:p-8',
          )}
          key={title}
        >
          {isFeatured ? (
            <>
              <div className="flex items-center justify-between gap-6">
                <h3 className="text-[13px] font-extrabold uppercase leading-5 tracking-[0.2em] text-white sm:tracking-[0.36em]">
                  {title}
                </h3>
                <div className="h-10 w-10 shrink-0">{icon}</div>
              </div>
              <p className="mt-8 max-w-[30ch] text-balance text-xl leading-8 text-white lg:mt-16 lg:text-2xl lg:leading-9">
                {description}
              </p>
            </>
          ) : (
            <>
              <div className="h-10 w-10">{icon}</div>
              <h3 className="mt-6 font-bold leading-6 text-white">{title}</h3>
              <p className="mt-1 leading-6 text-white/80">{description}</p>
            </>
          )}
        </li>
      );
    })}
  </ul>
);
