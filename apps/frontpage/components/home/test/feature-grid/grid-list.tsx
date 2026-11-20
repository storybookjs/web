import type { FC } from 'react';
import { features } from './features';

/**
 * Variant 4: a compact two-column list with hairline dividers.
 * Borrows the bold run-in captions under the /features/test panels
 * ("Chromatic auto scales capacity to your workload. Your tests run…")
 * and the full-width inverse dividers used between rows in the FAQ.
 */
export const GridList: FC = () => (
  <ul className="grid border-b border-white/10 sm:grid-cols-2 sm:gap-x-16 lg:gap-x-20">
    {features.map(({ icon, title, description }) => (
      <li
        className="flex items-start gap-4 border-t border-white/10 py-6"
        key={title}
      >
        <div className="mt-0.5 h-6 w-6 shrink-0">{icon}</div>
        <p className="leading-7 text-white/80">
          <strong className="font-bold text-white">{title}.</strong>{' '}
          {description}
        </p>
      </li>
    ))}
  </ul>
);
