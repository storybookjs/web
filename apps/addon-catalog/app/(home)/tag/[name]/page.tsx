import { Preview } from '../../../../components/preview';
import { fetchTagDetailsData } from '../../../../lib/fetch-tag-details-data';
import { notFound } from 'next/navigation';

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
  const data = (await fetchTagDetailsData(name)) || {};

  if ('error' in data) return notFound();

  return (
    <>
      <h3 className="mb-8 text-2xl font-bold">
        {data.displayName} integrations
      </h3>
      <div className="flex flex-col gap-6">
        {data.topIntegrations?.addons?.map((addon) => (
          <Preview
            key={addon.name}
            element={addon}
            orientation="horizontal"
            type="addon"
          />
        ))}
      </div>
    </>
  );
}
