import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
// eslint-disable-next-line -- the variable is camelCase
import { unstable_cache } from 'next/cache';
import { Preview } from '../../../../components/preview';
import { fetchTagsData } from '../../../../lib/fetch-tags-data';
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

const getCachedTagFromName = unstable_cache(
  async (tagName: string[]) => getTagFromName(tagName),
  ['tag-details'],
);

export const generateMetadata: GenerateMetaData = async ({ params }) => {
  const tagName = (await params).name.join('/');
  const data = await getCachedTagFromName([tagName]);

  if ('error' in data) return {};

  const title = data.displayName ?? data.name;

  return {
    ...(title
      ? {
          title: `${title} tag | Storybook integrations`,
        }
      : undefined),
  };
};

export default async function TagDetails({
  params: { name },
}: TagDetailsProps) {
  const data = await getCachedTagFromName(name);

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

export async function generateStaticParams() {
  const tags = (await fetchTagsData({ isCategory: true })) || [];
  const listOfNames = tags.map((tag) => ({ name: [...tag.split('/')] }));

  if (listOfNames.length === 0) {
    throw new Error('No tags found');
  }

  return listOfNames;
}
