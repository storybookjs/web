import { Button } from "@/components/ui/button";
import React, { useState, ComponentProps, ReactNode, useRef } from "react";

// const Integration = styled(Button)<{
//   inverse?: boolean;
//   active?: boolean;
//   color: string;
// }>`
//   border-radius: ${spacing.borderRadius.small}px;
//   padding: 8px;
//   background-color: ${(props) => props.color || "transparent"};

//   ${(props) =>
//     props.inverse &&
//     css`
//       box-shadow: rgb(255 255 255 / 10%) 0 0 0 1px inset;

//       &:hover,
//       &:active,
//       &:focus,
//       &:active:focus:hover {
//         box-shadow: ${color.secondary} 0 0 0 1px inset;
//       }
//     `}

//   ${(props) =>
//     props.active
//       ? css`
//           box-shadow: ${color.secondary} 0 0 0 1px inset;
//         `
//       : css`
//           opacity: 0.5;
//         `}

//   span {
//     display: block;
//   }

//   img {
//     display: block;
//     width: 24px;
//     height: 24px;
//     object-fit: contain;
//   }
// `;
// Integration.defaultProps = {
//   appearance: "outline",
//   containsIcon: true,
// };

interface IntegrationProps extends ComponentProps<typeof Button> {
  image: string;
  index: number;
  color: string;
}

interface IntegrationsCarouselProps {
  integrations: (IntegrationProps & { media: ReactNode })[];
  animationDisabled?: boolean;
}

export const IntegrationsCarousel = ({
  integrations,
  ...props
}: IntegrationsCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIntegration = integrations[activeIndex];
  const ref = useRef(null);

  return (
    <div ref={ref} {...props}>
      <figure className="m-0">{activeIntegration.media}</figure>
      <div className="flex items-center gap-[10px] mt-5">
        {integrations.map(({ media, name, image, ...integration }, index) => (
          <Button
            key={name}
            // active={name === activeIntegration.name}
            onClick={() => {
              setActiveIndex(index);
            }}
            {...integration}
          >
            <img src={image} alt={name} />
          </Button>
        ))}
        <div className="text-zinc-600">+ and more</div>
      </div>
    </div>
  );
};
