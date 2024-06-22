import { Icon, TooltipMessage } from '@repo/ui';
import { ComponentProps } from 'react';

type Appearance = 'official' | 'integrators' | 'community';

interface VerifiedBadgeProps {
  trigger?: 'hover' | 'click';
  creator?: string;
  appearance?: Appearance;
}

const VerifiedBadgeIcon = (
  props: ComponentProps<typeof Icon> & { appearance?: Appearance },
) => <Icon {...props} />;
// color: ${(props) =>
//   props.appearance === 'official' ? color.secondary : color.green};
// width: 14px;
// height: 14px;
// margin-bottom: 0.25em;
// z-index: 2;
// position: relative;

// TODO: WithTooltip 😱
const WithTooltip = (props: any) => <div {...props} />;
const BadgeWrapper = (props: any) => <WithTooltip {...props} />;
// && {
//   margin-left: 6px;
// }

export const VerifiedBadge = ({
  trigger = 'hover',
  creator,
  appearance,
}: VerifiedBadgeProps) => (
  <BadgeWrapper
    placement="top"
    trigger={trigger}
    tooltip={
      <TooltipMessage
        desc={
          appearance === 'official'
            ? 'This integration is maintained and recommended by the Storybook team.'
            : `This integration is maintained by ${creator}.`
        }
      />
    }
  >
    {/* @ts-expect-error - TODO: No idea what the block prop is meant for */}
    <VerifiedBadgeIcon icon="verified" block appearance={appearance} />
  </BadgeWrapper>
);
