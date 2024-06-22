import { ComponentProps } from 'react';
import { AddonItem } from './addon-item';

interface AddonsGridProps {
  title: string;
  actions: React.ReactNode;
  addonItems: ({ id: string } & ComponentProps<typeof AddonItem>)[];
  from: {
    title: string;
    link: string;
  };
}

const Grid = (props: any) => <div {...props} />;
// display: grid;
// grid-gap: ${spacing.padding.medium}px;
// grid-template-columns: repeat(auto-fit, 1fr);

// @media (min-width: ${breakpoint}px) {
//   grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
// }

const Title = (props: any) => <h3 {...props} />;
// font-weight: ${typography.weight.bold};
// font-size: ${typography.size.m2}px;
// line-height: ${typography.size.m3}px;
// color: ${color.darkest};

const SectionHeader = (props: any) => <div {...props} />;
// display: flex;
// align-items: center;
// justify-content: space-between;
// margin-bottom: ${spacing.padding.medium}px;

export const AddonsGrid = ({
  title,
  actions,
  addonItems = [],
  from,
  ...props
}: AddonsGridProps) => (
  <section>
    <Grid {...props}>
      {addonItems.map((addon) => (
        <AddonItem
          key={addon.id}
          from={from}
          orientation="vertical"
          {...addon}
        />
      ))}
    </Grid>
  </section>
);
