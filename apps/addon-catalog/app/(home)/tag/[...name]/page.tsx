import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Preview } from '../../../../components/preview';
import { fetchTagDetailsData } from '../../../../lib/fetch-tag-details-data';
import type { Tag } from '../../../../types';

// 60*60*24 = 24 hrs
export const revalidate = 86400;

interface Params {
  name: string[];
}

type GenerateMetaData = (props: {
  params: Promise<Params>;
}) => Promise<Metadata>;

interface TagDetailsProps {
  params: Params;
}

async function getTagFromName(
  tagName: string[],
): Promise<Tag | { error: string }> {
  const name = tagName.join('/');
  return (await fetchTagDetailsData(name)) || {};
}

export const generateMetadata: GenerateMetaData = async ({ params }) => {
  const tagName = (await params).name.join('/');
  const data = (await fetchTagDetailsData(tagName)) || {};

  if ('error' in data) return {};
  const { displayName } = data;

  return {
    title: displayName ? `${displayName} integrations | Storybook` : undefined,
  };
};

export default async function TagDetails({
  params: { name },
}: TagDetailsProps) {
  const data = await getTagFromName(name);

  if (!data || 'error' in data) return notFound();

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
