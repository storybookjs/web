import type { Metadata } from 'next';
import { Header, Footer, Container } from '@repo/ui';
import { fetchGithubCount } from '@repo/utils';
import { generateDocsTree } from '../../lib/get-tree';
import { Submenu } from '../../components/docs/submenu';
import { docsVersions } from '@repo/utils';

export const metadata: Metadata = {
  title: 'Storybook',
  description:
    "Storybook is a frontend workshop for building UI components and pages in isolation. Thousands of teams use it for UI development, testing, and documentation. It's open source and free.",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
  params: { slug: string[] };
}) {
  const { number: githubCount } = await fetchGithubCount();

  const listofTrees = docsVersions.map((version) => {
    return {
      version: version.id,
      tree: generateDocsTree(`content/docs/${version.id}`),
    };
  });

  return (
    <>
      <Header
        algoliaApiKey={process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string}
        githubCount={githubCount}
        subMenu={<Submenu listOfTrees={listofTrees} />}
        variant="system"
      />
      <Container>{children}</Container>
      <Footer />
    </>
  );
}
