import { fetchTagDetailsData } from '../../../lib/fetch-tag-details-data';
import { fetchTagsData } from '../../../lib/fetch-tags-data';

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

export default async function TagDetails({ params: { name } }: TagDetailsProps) {
  const tag = await fetchTagDetailsData(name);

  /**
   * You can use `tag.isCategory` to render the correct template
   */

  return (
    <main className="p-8">
      <pre>
        {JSON.stringify(
          tag,
          null,
          2,
        )}
      </pre>
    </main>
  );
}
