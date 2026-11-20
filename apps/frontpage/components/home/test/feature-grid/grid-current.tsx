import type { FC } from 'react';
import { features } from './features';

/** The grid as it ships today: icon, title and text in three open columns */
export const GridCurrent: FC = () => (
  <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-20 lg:gap-y-16">
    {features.map(({ icon, title, description }) => (
      <div key={title}>
        <div className="mb-5 h-8 w-8 sm:h-10 sm:w-10">{icon}</div>
        <h3 className="mb-2 font-bold text-white">{title}</h3>
        <p className="leading-relaxed text-white">{description}</p>
      </div>
    ))}
  </div>
);
