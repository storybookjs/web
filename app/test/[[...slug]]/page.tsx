import { getVersion } from "@/lib/get-version";
import * as MDX from "@/components/mdx";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { renderers } from "@/docs-renderers";
import { getPageData } from "@/lib/get-page2";
import { docsVersions } from "@/docs-versions";
import { cookies } from "next/headers";
import { Renderers } from "@/components/docs/renderers";
import { generateDocsTree } from "@/lib/get-tree";

interface Props {
  params: {
    slug: string[];
  };
}

export const generateStaticParams = async () => {
  const tree = generateDocsTree();

  const result: { slug: string[] }[] = [];

  const ids = (data: TreeProps[]) => {
    data.forEach((item) => {
      if ("slug" in item) {
        result.push({
          slug: item.slug.replace("docs/", "").split("/"),
        });
      }
      if (item.children) {
        ids(item.children);
      }
    });
  };

  ids(tree);

  return [{ slug: ["get-started"] }, { slug: ["8.0-test-1", "get-started"] }];

  // return result;
};

export default async function Page({ params: { slug } }: Props) {
  const tree = generateDocsTree();
  const activeVersion = getVersion(slug);
  const hasVersion = docsVersions.some((version) => slug[0] === version.id);
  const newSlug = [...slug];
  if (!hasVersion) newSlug.unshift(activeVersion.id);

  const page = await getPageData(newSlug);

  console.log(page);

  return (
    <div>
      <div>Slug: {slug.join("/")}</div>
      <div>Title: {page?.title}</div>
    </div>
  );
}
