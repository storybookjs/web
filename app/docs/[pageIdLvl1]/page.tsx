import { notFound } from "next/navigation";
import "highlight.js/styles/github-dark.css";
import { getTree } from "@/lib/getTree";
import { getPage } from "@/lib/getPage";
import { Article } from "@/components/article";

// export const revalidate = 86400;
export const revalidate = 0;

type Props = {
  params: {
    pageIdLvl1: string;
  };
};

export async function generateStaticParams() {
  const pages = await getTree();

  if (!pages) return [];

  return pages.map((page) => ({
    pageIdLvl1: page.id,
  }));
}

export async function generateMetadata({ params: { pageIdLvl1 } }: Props) {
  // Check if the page exists on its own
  const page = await getPage(`docs/${pageIdLvl1}.mdx`);

  // if not, check if it exists as an index
  const pageIndex = await getPage(`docs/${pageIdLvl1}/index.mdx`);

  if (!page && !pageIndex) {
    return {
      title: "Page Not Found",
    };
  }

  const meta = page ? page.meta : pageIndex?.meta;

  return {
    title: meta?.title || "Storybook",
  };
}

export default async function Post({ params: { pageIdLvl1 } }: Props) {
  const tree = await getTree();
  const pageInTree = tree && tree.find((page) => page.slug === pageIdLvl1);
  const pageDataId = pageInTree?.id;
  const page = await getPage(`${pageDataId}.mdx`);

  if (!page) notFound();

  return (
    <Article
      title={page.meta.title}
      isIndex={page?.meta.showAsTabs}
      isApi={pageInTree?.currentSegment === "api"}
      pathIndex={`/docs/${pageIdLvl1}`}
      pathApi="/docs"
      content={page.content}
    />
  );
}
