import { getVersion } from "@/lib/get-version";
import * as MDX from "@/components/mdx";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { renderers } from "@/docs-renderers";
import { getPageData } from "@/lib/get-page";
import { docsVersions } from "@/docs-versions";
import { cookies } from "next/headers";
import { Renderers } from "@/components/docs/renderers";
import { generateDocsTree } from "@/lib/get-tree";

const isHomepage = (slug: string[]) => {
  return (
    slug === undefined ||
    (slug &&
      slug.length === 1 &&
      docsVersions.some((version) => {
        return slug[0] === version.id;
      }))
  );
};

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
        // console.log(item.slug);
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

  return result;
};

export default async function Page({ params: { slug } }: Props) {
  const tree = generateDocsTree();

  return <div>Slug: {slug}</div>;
}
