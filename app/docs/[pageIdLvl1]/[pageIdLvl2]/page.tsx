import { notFound } from "next/navigation";
import "highlight.js/styles/github-dark.css";
import { getTree } from "@/lib/getTree";
import { getPage } from "@/lib/getPage";
import Link from "next/link";

// export const revalidate = 86400;
export const revalidate = 0;

type Props = {
  params: {
    pageIdLvl1: string;
    pageIdLvl2: string;
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
  params: { pageIdLvl1, pageIdLvl2 },
}: Props) {
  // Check if the page exists on its own
  const page = await getPage(`docs/${pageIdLvl1}/${pageIdLvl2}.mdx`);

  // if not, check if it exists as an index
  const pageIndex = await getPage(`docs/${pageIdLvl1}/${pageIdLvl2}/index.mdx`);

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

export default async function Post({
  params: { pageIdLvl1, pageIdLvl2 },
}: Props) {
  const tree = await getTree();
  const findLvl1 = tree && tree.find((page) => page.slug === pageIdLvl1);
  const pageInTree =
    findLvl1 && findLvl1.children.find((page) => page.slug === pageIdLvl2);
  const pageDataId = pageInTree?.id;
  const page = await getPage(`${pageDataId}.mdx`);
  const showTabs = pageInTree?.showAsTabs;

  if (!page) notFound();

  return (
    <>
      <h2 className="text-3xl mt-4 mb-0">{page.meta?.title || ""}</h2>
      {showTabs && (
        <div className="flex gap-4 mt-6">
          <Link
            href={`/docs/${pageIdLvl1}/${pageIdLvl2}`}
            className="border-b border-blue-500 text-blue-500"
          >
            Usage
          </Link>
          <Link href={`/docs/${pageIdLvl1}/${pageIdLvl2}/api`} className="">
            API
          </Link>
        </div>
      )}
      <article>{page.content}</article>
    </>
  );
}
