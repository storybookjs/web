import { docsVersions } from "@/docs-versions";
import { getVersion } from "@/lib/getVersion";
import { H1 } from "@/components/mdx";
import { getPage } from "@/lib/getPage";
import { getTree } from "@/lib/getTree";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPages } from "@/lib/getAllPages";

export default async function TestPage({
  params,
}: {
  params: { slug: string[] };
}) {
  // Get the latest version
  const activeVersion = getVersion(params.slug);

  // Check if the URL has a version in it

  // Get the path

  // Get all pages in a flat list
  const allPages = await getAllPages(activeVersion.id);

  // Get path - Make sure to take the right version
  // const hasVersionInUrl =
  //   params.slug &&
  //   docsVersions.some((version) => {
  //     return params.slug[0] === version.id;
  //   });
  const pathFromUrl = params.slug.join("/");
  // const path = hasVersionInUrl
  //   ? `/docs/${pathFromUrl}`
  //   : `/docs/${activeVersion.id}/${pathFromUrl}`;
  const path = `/docs/${pathFromUrl}`;

  // Find the page in all pages
  const pageInTree = allPages && allPages.find((page) => page.slug === path);
  const page = await getPage(pageInTree?.path || "");

  if (!page) notFound();

  return (
    <div>
      <H1>{page.title || "Title is missing"}</H1>
      {page.tabs && page.tabs.length > 0 && (
        <div className="flex items-center gap-8">
          {page.tabs.map((tab, index) => {
            let href = "";
            if (index === 0 && !page.isTab) href = page.slug;
            if (index === 0 && page.isTab)
              href = page.slug.split("/").slice(0, -1).join("/");
            if (index > 0 && !page.isTab) href = `${page.slug}/${tab}`;
            if (index > 0 && page.isTab)
              href = `${(href = page.slug
                .split("/")
                .slice(0, -1)
                .join("/"))}/${tab}`;

            return (
              <Link key={tab} href={href}>
                {tab}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
