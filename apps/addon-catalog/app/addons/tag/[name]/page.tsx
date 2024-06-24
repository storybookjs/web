import { HomeWrapper } from '../../../../components/home-wrapper';
import { fetchTagsData } from '../../../../lib/fetch-tags-data';
import { fetchSearchData } from '../../../../lib/fetch-search-data';

interface TagDetailsProps {
  params: {
    name: string;
  };
}

export async function generateStaticParams() {
  const categories = (await fetchTagsData({ isCategory: true })) || [];
  const tags = (await fetchTagsData()) || [];
  return [...categories, ...tags].map((name) => ({
    params: { name },
  }));
}

export default async function TagDetails({
  params: { name },
}: TagDetailsProps) {
  const addons = await fetchSearchData(name);

  console.log(addons);

  /**
   * You can use `tag.isCategory` to render the correct template
   */

  return (
    <HomeWrapper>
      <h3 className="mb-8 text-2xl font-bold">{name}</h3>
      {addons?.map((addon) => <div>{addon.name}</div>)}
      {/* <pre>{JSON.stringify(tag, null, 2)}</pre> */}
    </HomeWrapper>
  );
}
