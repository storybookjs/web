import type { FC } from 'react';
import { features } from './features';

/**
 * Variant 3: a connected sequence from a local spot check to CI.
 * Borrows the context-share hub on the homepage design: outlined icon
 * tiles joined by thin connector lines tinted with each node's colour.
 * Horizontal at xl, a vertical rail below that.
 */
export const GridSequence: FC = () => (
  <ol className="grid gap-y-10 xl:grid-cols-6 xl:gap-x-6">
    {features.map(({ icon, title, description, hue }, index) => {
      const next = features[index + 1];
      return (
        <li className="relative flex gap-6 xl:flex-col xl:gap-0" key={title}>
          {next ? (
            <span
              aria-hidden
              className="absolute left-7 top-14 -bottom-10 w-px opacity-60 [--seq-dir:180deg] xl:[--seq-dir:90deg] xl:-right-6 xl:bottom-auto xl:left-14 xl:top-7 xl:h-px xl:w-auto"
              style={{
                backgroundImage: `linear-gradient(var(--seq-dir), ${hue}, ${next.hue})`,
              }}
            />
          ) : null}
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-[5px] border border-white/10 bg-homeBackground">
            <div className="h-8 w-8">{icon}</div>
          </div>
          <div className="pt-3 xl:pr-2 xl:pt-6">
            <h3 className="font-bold leading-6 text-white">{title}</h3>
            <p className="mt-1 leading-6 text-white/80">{description}</p>
          </div>
        </li>
      );
    })}
  </ol>
);
