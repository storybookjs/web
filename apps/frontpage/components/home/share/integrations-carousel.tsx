import { cn } from '@repo/utils';
import type { ComponentProps, ReactNode, FC } from 'react';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import type { Button } from '../../ui/button';

interface IntegrationProps extends ComponentProps<typeof Button> {
  image: string;
  index: number;
  color: string;
}

type Integration = IntegrationProps & { media: ReactNode };

interface IntegrationsCarouselProps {
  integrations: Integration[];
  animationDisabled?: boolean;
  className?: string;
}

export const IntegrationsCarousel: FC<IntegrationsCarouselProps> = ({
  integrations,
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIntegration = integrations[activeIndex];
  const ref = useRef(null);

  return (
    <div className={className} ref={ref}>
      <figure className="m-0">{activeIntegration.media}</figure>
      <div className="flex items-center gap-4 mt-5">
        {integrations.map(({ name, image, ...integration }, index) => (
          <button
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded border border-transparent p-2 opacity-50 transition-all duration-200 hover:border-blue-500 hover:opacity-100',
              name === activeIntegration.name &&
                'border border-blue-500 opacity-100',
            )}
            key={name}
            onClick={() => {
              setActiveIndex(index);
            }}
            style={{ backgroundColor: integration.color }}
            type="button"
            {...integration}
          >
            <Image alt={name ?? ''} src={image} />
          </button>
        ))}
        <div className="ml-2 text-slate-500">+ and more</div>
      </div>
    </div>
  );
};
