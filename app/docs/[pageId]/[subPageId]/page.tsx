import { notFound } from "next/navigation";
import "highlight.js/styles/github-dark.css";
import { getTree } from "@/lib/getTree";
import { getPageByName } from "@/lib/getPageByName";

// export const revalidate = 86400;
export const revalidate = 0;

type Props = {
  params: {
    pageId: string;
    subPageId: string;
  };
};

export async function generateStaticParams() {
  const pages = await getTree();

  if (!pages) return [];

  return pages.map((page) => ({
    pageId: page.id,
  }));
}

export async function generateMetadata({
  params: { pageId, subPageId },
}: Props) {
  // Check if the page exists on its own
  const page = await getPageByName(`docs/${pageId}/${subPageId}.mdx`);

  // if not, check if it exists as an index
  const pageIndex = await getPageByName(
    `docs/${pageId}/${subPageId}/index.mdx`
  );

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

export default async function Post({ params: { pageId, subPageId } }: Props) {
  // Check if the page exists on its own
  const page = await getPageByName(`docs/${pageId}/${subPageId}.mdx`);

  // if not, check if it exists as an index
  const pageIndex = await getPageByName(
    `docs/${pageId}/${subPageId}/index.mdx`
  );

  if (!page && !pageIndex) notFound();

  if (!page && pageIndex) {
    // This mean that we are going to have multiple tabs
    // 1. Get all the adjacent pages in the same folder
    // 2. Build the data with all pages
  }

  const meta = page ? page.meta : pageIndex?.meta;
  const content = page ? page.content : pageIndex?.content;

  console.log(meta, content);

  return (
    <>
      <h2 className="text-3xl mt-4 mb-0">{meta?.title || ""}</h2>
      <article>{content}</article>
    </>
  );
}
