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
    pageIdLvl3: string;
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
  params: { pageIdLvl1, pageIdLvl2, pageIdLvl3 },
}: Props) {
  const tree = await getTree();
  const findLvl1 = tree && tree.find((page) => page.slug === pageIdLvl1);
  const findLvl2 =
    findLvl1 && findLvl1.children.find((page) => page.slug === pageIdLvl2);
  const findPageInTree =
    findLvl2 && findLvl2.children.find((page) => page.slug === pageIdLvl3);
  const pageDataId = findPageInTree?.id;
  const page = await getPage(`${pageDataId}.mdx`);

  if (!page) return { title: "Page Not Found" };

  return {
    title: page.meta?.title || "Storybook",
  };
}

export default async function Post({
  params: { pageIdLvl1, pageIdLvl2, pageIdLvl3 },
}: Props) {
  const tree = await getTree();
  const findLvl1 = tree && tree.find((page) => page.slug === pageIdLvl1);
  const findLvl2 =
    findLvl1 && findLvl1.children.find((page) => page.slug === pageIdLvl2);
  const findPageInTree =
    findLvl2 && findLvl2.children.find((page) => page.slug === pageIdLvl3);
  const pageDataId = findPageInTree?.id;
  const page = await getPage(`${pageDataId}.mdx`);

  const showTabs = findLvl2?.showAsTabs;

  if (!page) notFound();

  return (
    <>
      <h2 className="text-3xl mt-4 mb-0">{page.meta?.title || ""}</h2>
      {showTabs && (
        <div className="flex gap-4 mt-6">
          <Link href={`/docs/${pageIdLvl1}/${pageIdLvl2}`} className="">
            Usage
          </Link>
          <Link
            href={`/docs/${pageIdLvl1}/${pageIdLvl2}/api`}
            className="border-b border-blue-500 text-blue-500"
          >
            API
          </Link>
        </div>
      )}
      <article>{page.content}</article>
    </>
  );
}
