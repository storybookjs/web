import { cn } from '@repo/utils';
import type { ComponentProps, ReactNode, FC } from 'react';
import React, { useState, useRef } from 'react';
import type { Button } from "../../ui/button";

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
  const activeIntegration = integrations[activeIndex]!;
  const ref = useRef(null);

  return (
    <div className={className} ref={ref}>
      <figure className="m-0">{activeIntegration.media}</figure>
      <div className="flex items-center gap-[10px] mt-5">
        {integrations.map(({ media, name, image, ...integration }, index) => (
          <button
            className={cn(
              'rounded w-10 h-10 flex items-center justify-center p-2 opacity-50 hover:opacity-100 transition-all duration-200 border border-transparent hover:border-blue-500',
              name === activeIntegration.name &&
                'opacity-100 border border-blue-500',
            )}
            key={name}
            onClick={() => {
              setActiveIndex(index);
            }}
            style={{ backgroundColor: integration.color }}
            {...integration}
          >
            <img alt={name} src={image} />
          </button>
        ))}
        <div className="text-zinc-600">+ and more</div>
      </div>
    </div>
  );
};
