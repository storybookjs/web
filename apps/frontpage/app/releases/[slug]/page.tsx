import { Header, Footer, Container } from '@repo/ui';
import { cn, fetchGithubCount } from '@repo/utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReleaseNewsletter } from '../../../components/release-newsletter';
import { Sidebar } from '../../../components/docs/sidebar/sidebar';
import { getRelease } from '../../../lib/get-release';
import { getReleases } from '../../../lib/get-releases';
import { DocsMainNav } from '../../../components/docs/sidebar/docs-main-nav';

interface PageProps {
  params: {
    slug: string;
  };
}

export const generateStaticParams = () => {
  return getReleases().map((release) => ({
    slug: release,
  }));
};

export default async function Page({ params: { slug } }: PageProps) {
  const releases = getReleases();
  const { number: githubCount } = await fetchGithubCount();

  // TODO: This is not really working on prod
  if (!releases.includes(slug)) return notFound();

  const page = await getRelease(slug);

  return (
    <>
      <Header
        algoliaApiKey={process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!}
        githubCount={githubCount}
      />
      <Container asChild className="flex gap-4 lg:pl-5 lg:pr-8">
        <main>
          <Sidebar>
            <DocsMainNav />
            <div className="flex flex-col pt-4 mt-4 border-t border-zinc-200">
              {releases
                .sort((a, b) => b.localeCompare(a))
                .map((release) => (
                  <Link
                    className={cn(
                      'flex h-8 items-center px-2 text-sm text-zinc-600 transition-colors hover:text-blue-500',
                      release === slug && 'text-blue-500',
                    )}
                    href={`/releases/${release}`}
                    key={release}
                  >
                    Version {release}
                  </Link>
                ))}
            </div>
          </Sidebar>
          <article className="flex-1 w-full max-w-3xl py-12">
            <h1 className="mt-0 mb-6 text-4xl font-bold">
              {page?.frontmatter.title ?? 'Page Not Found'}
            </h1>
            {page?.content}
            <ReleaseNewsletter />
          </article>
        </main>
      </Container>
      <Footer />
    </>
  );
}
