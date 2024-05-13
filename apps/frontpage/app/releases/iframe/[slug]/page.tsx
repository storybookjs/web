import { notFound } from 'next/navigation';
import { ReleaseNewsletter } from '../../../../components/release-newsletter';
import { getRelease } from '../../../../lib/get-release';
import { getReleases } from '../../../../lib/get-releases';

interface HomeProps {
  params: {
    slug: string;
  };
}

export const generateStaticParams = () => {
  return getReleases().map((release) => ({
    slug: release,
  }));
};

export default async function Home({ params: { slug } }: HomeProps) {
  const releases = getReleases();

  // TODO: This is not really working on prod
  if (!releases.includes(slug)) return notFound();

  const page = await getRelease(slug);

  return (
    <article className="w-full max-w-4xl mx-auto px-4 lg:px-8 my-10">
      <h1 className="text-4xl mt-0 mb-6 font-bold">
        {page?.frontmatter.title || 'Page Not Found'}
      </h1>
      {page?.content}
      <ReleaseNewsletter />
    </article>
  );
}
