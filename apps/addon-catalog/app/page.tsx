import Link from 'next/link';

import { Icon } from '@repo/ui';
import { AddonItem } from '../components/addon-item';
import { AddonsGrid } from '../components/addons-grid';
import { RecipesList } from '../components/recipes-list';
import { buildTagLinks } from '../lib/build-tag-links';
import { fetchHomeData } from '../lib/fetch-home-data';
import { TagList } from '../components/tag-list';

const PageHeaderContainer = (props: any) => <header {...props} />;
// ${pageMargins}
// padding-top: 3rem;
// padding-bottom: 20px;
// display: flex;
// flex-direction: column;

// @media (min-width: ${breakpoint * 1.333}px) {
//   padding-bottom: 40px;
//   padding-top: 4rem;
//   padding-bottom: ${spacing.padding.medium}px;
// }

// @media (min-width: ${breakpoint * 1.5}px) {
//   flex-direction: row;
//   padding-bottom: 30px;
// }

const PageHeadingLeft = (props: any) => <div {...props} />;
// flex: 1 1 auto;

const PageHeading = (props: any) => <h1 {...props} />;
// font-size: ${typography.size.l1}px;
// line-height: ${typography.size.l2}px;
// font-weight: ${typography.weight.bold};
// margin-bottom: 1.25rem;
// color: ${color.darkest};

// @media (min-width: ${breakpoint * 1}px) {
//   font-size: ${typography.size.l2}px;
//   line-height: ${typography.size.l3}px;
//   margin-bottom: 0.75rem;
// }

const PageSubheading = (props: any) => <p {...props} />;
// margin: 0; //reset
// font-size: ${typography.size.s3}px;
// line-height: 28px;
// color: ${color.darker};

const PageHeadingRight = (props: any) => <div {...props} />;
// display: none;
// font-size: ${typography.size.s2}px;
// line-height: ${typography.size.m1}px;
// font-weight: ${typography.weight.bold};

// @media (min-width: ${breakpoint * 1.5}px) {
//   display: block;
//   align-self: flex-start;
//   justify-self: flex-end;
// }

const PageHeader = () => (
  <PageHeaderContainer>
    <PageHeadingLeft>
      <PageHeading>Integrations</PageHeading>
      <PageSubheading>
        Integrate your tools with Storybook to connect workflows and unlock
        advanced features.
      </PageSubheading>
    </PageHeadingLeft>
    <PageHeadingRight>
      <Link href="/docs/react/addons/integration-catalog/">
        <Icon icon="add" />
        Add your integration
      </Link>
    </PageHeadingRight>
  </PageHeaderContainer>
);

const SectionHeader = (props: any) => <div {...props} />;
// display: flex;
// align-items: center;
// justify-content: space-between;
// margin-bottom: ${spacing.padding.medium}px;

const Title = (props: any) => <h3 {...props} />;
// font-weight: ${typography.weight.bold};
// font-size: ${typography.size.m2}px;
// line-height: ${typography.size.m3}px;
// color: ${color.darkest};

const AddonCallout = (props: any) => <AddonItem {...props} />;
// background-color: ${background.positive};
// border-color: ${rgba(color.positive, 0.1)};
// margin-bottom: 3rem;

// &:hover {
//   border-color: ${rgba(color.positive, 0.3)};
// }

const PopularAddons = (props: any) => <AddonsGrid {...props} />;
// margin-bottom: 3rem;

const PopularRecipes = (props: any) => <RecipesList {...props} />;
// margin-bottom: 3rem;

export default async function Home() {
  const {
    popularAddons = [],
    popularRecipes = [],
    trendingTags = [],
    vta,
  } = (await fetchHomeData()) || {};
  // console.log({ popularAddons, popularRecipes, trendingTags, vta })

  const tagLinks = buildTagLinks(trendingTags);

  return (
    <>
      <div className="mb-8 mt-12 flex items-start justify-between">
        <div>
          <h1 className="mb-4 text-5xl">Integrations</h1>
          <p>
            Integrate your tools with Storybook to connect workflows and unlock
            advanced features.
          </p>
        </div>
        <button className="text-md h-12 flex-shrink-0 rounded-full bg-blue-500 px-6 text-white">
          Add your integration
        </button>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-[220px] flex-shrink-0">Sidebar</div>
        <div className="flex-1">
          <TagList tagLinks={tagLinks} />
          <h3 className="mb-4 mt-12 text-2xl">New to Storybook 8</h3>
          {vta && <AddonItem key={vta.id} orientation="horizontal" {...vta} />}
          <h3 className="mb-4 mt-12 text-2xl">Popular addons</h3>
          <div className="grid grid-cols-2 gap-4">
            {popularAddons.map((addon) => (
              <AddonItem key={addon.id} orientation="vertical" {...addon} />
            ))}
          </div>
          <h3 className="mb-4 mt-12 text-2xl">Popular recipes</h3>
          <PopularRecipes recipeItems={popularRecipes} />
        </div>
      </div>
    </>
  );
}
