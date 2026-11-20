import type { FC } from 'react';
import { features } from './features';

/**
 * Variant 1: outlined facet cards with the icon beside the text.
 * Borrows the Visual · Accessibility · Interaction facet row on
 * /features/test (1px white/10 outline, 5px radius, 40px icon on the left).
 */
export const GridCards: FC = () => (
  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
    {features.map(({ icon, title, description }) => (
      <li
        className="flex items-start gap-5 rounded-[5px] border border-white/10 p-5 sm:p-6"
        key={title}
      >
        <div className="h-10 w-10 shrink-0">{icon}</div>
        <div>
          <h3 className="font-bold leading-6 text-white">{title}</h3>
          <p className="mt-1 leading-6 text-white/80">{description}</p>
        </div>
      </li>
    ))}
  </ul>
);
