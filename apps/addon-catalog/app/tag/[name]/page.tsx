import { HomeWrapper } from '../../../components/home-wrapper';
import { Preview } from '../../../components/preview';
import { fetchTagDetailsData } from '../../../lib/fetch-tag-details-data';

interface TagDetailsProps {
  params: {
    name: string;
  };
}

// export async function generateStaticParams() {
//   const categories = (await fetchTagsData({ isCategory: true })) || [];
//   const tags = (await fetchTagsData()) || [];
//   return [...categories, ...tags].map((name) => ({
//     params: { name },
//   }));
// }

export default async function TagDetails({
  params: { name },
}: TagDetailsProps) {
  const { topIntegrations } = await fetchTagDetailsData(name) || {};

  /**
   * TODO: Category template
   * You can use `tag.isCategory` to render the correct template
   */

  return (
    <HomeWrapper>
      <h3 className="mb-8 text-2xl font-bold">{name}</h3>
      <div className="flex flex-col gap-6">
        {topIntegrations?.addons?.map((addon) => (
          <Preview
            key={addon.name}
            element={addon}
            orientation="horizontal"
            type="addon"
          />
        ))}
      </div>
    </HomeWrapper>
  );
}
