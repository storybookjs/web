import { notFound } from "next/navigation";
import "highlight.js/styles/github-dark.css";
import { getTree } from "@/lib/getTree";
import { getPageByName } from "@/lib/getPageByName";

// export const revalidate = 86400;
export const revalidate = 0;

type Props = {
  params: {
    pageId: string;
  };
};

export async function generateStaticParams() {
  const pages = await getTree();

  if (!pages) return [];

  return pages.map((page) => ({
    pageId: page.id,
  }));
}

export async function generateMetadata({ params: { pageId } }: Props) {
  // Check if the page exists on its own
  const page = await getPageByName(`docs/${pageId}.mdx`);

  // if not, check if it exists as an index
  const pageIndex = await getPageByName(`docs/${pageId}/index.mdx`);

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

export default async function Post({ params: { pageId } }: Props) {
  // Check if the page exists on its own
  const page = await getPageByName(`docs/${pageId}.mdx`);

  // if not, check if it exists as an index
  const pageIndex = await getPageByName(`docs/${pageId}/index.mdx`);

  if (!page && !pageIndex) notFound();

  const meta = page ? page.meta : pageIndex?.meta;
  const content = page ? page.content : pageIndex?.content;

  return (
    <>
      <h2 className="text-3xl mt-4 mb-0">{meta?.title || ""}</h2>
      <article>{content}</article>
    </>
  );
}
