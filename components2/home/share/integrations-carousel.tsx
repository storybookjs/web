import { Button } from "@/components2/ui/button";
import { cn } from "@/lib/tailwind";
import React, { useState, ComponentProps, ReactNode, useRef, FC } from "react";

interface IntegrationProps extends ComponentProps<typeof Button> {
  image: string;
  index: number;
  color: string;
}

interface IntegrationsCarouselProps {
  integrations: (IntegrationProps & { media: ReactNode })[];
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
    <div ref={ref} className={className}>
      <figure className="m-0">{activeIntegration.media}</figure>
      <div className="flex items-center gap-[10px] mt-5">
        {integrations.map(({ media, name, image, ...integration }, index) => (
          <button
            className={cn(
              "rounded w-10 h-10 flex items-center justify-center p-2 opacity-50 hover:opacity-100 transition-all duration-200 border border-transparent hover:border-blue-500",
              name === activeIntegration.name &&
                "opacity-100 border border-blue-500"
            )}
            key={name}
            style={{ backgroundColor: integration.color }}
            onClick={() => {
              setActiveIndex(index);
            }}
            {...integration}
          >
            <img src={image} alt={name} />
          </button>
        ))}
        <div className="text-zinc-600">+ and more</div>
      </div>
    </div>
  );
};
