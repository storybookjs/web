import type { FC } from 'react';
import { features } from './features';

/**
 * Variant 5: icon-led tiles in a hairline matrix.
 * Borrows the haloed icon nodes (the 99.9% Uptime SLA icon and the loop
 * illustration's nodes) and the widely tracked uppercase labels from the
 * context-efficiency comparison. Inner rules only, no outer frame.
 */
export const GridMatrix: FC = () => (
  <div className="overflow-hidden">
    <ul className="-ml-px -mt-px grid sm:grid-cols-2 lg:grid-cols-3">
      {features.map(({ icon, title, description, hue }) => (
        <li
          className="flex flex-col items-center border-l border-t border-white/10 px-6 py-8 text-center sm:py-10 lg:px-10 lg:py-12"
          key={title}
        >
          <div className="relative h-10 w-10">
            <span
              aria-hidden
              className="absolute -inset-5 rounded-full"
              style={{ backgroundColor: `${hue}0f` }}
            />
            <span
              aria-hidden
              className="absolute -inset-2.5 rounded-full"
              style={{ backgroundColor: `${hue}1f` }}
            />
            <div className="relative h-10 w-10">{icon}</div>
          </div>
          <h3 className="mt-10 text-[13px] font-extrabold uppercase leading-5 tracking-[0.2em] text-white sm:tracking-[0.3em]">
            {title}
          </h3>
          <p className="mt-3 max-w-[32ch] text-balance leading-7 text-white/80">
            {description}
          </p>
        </li>
      ))}
    </ul>
  </div>
);
