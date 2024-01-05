import { docsVersions } from "@/docs-versions";
import { getVersion } from "@/lib/getVersion";
import { H1 } from "@/components/mdx";
import { getPage } from "@/lib/getPage";
import { getTree } from "@/lib/getTree";

export default async function TestPage({
  params,
}: {
  params: { slug: string[] };
}) {
  // Get the latest version
  const activeVersion = getVersion(params.slug);

  // Check if the URL has a version in it
  const hasVersionInUrl =
    params.slug &&
    docsVersions.some((version) => {
      return params.slug[0] === version.id;
    });

  // Get article
  const tree = await getTree(activeVersion.id);
  const pageInTree = tree && tree.find((page) => page.slug === params.slug[0]);
  const page = await getPage(pageInTree?.path || "");

  console.log(page);

  return (
    <div>
      <H1>{page?.meta.title || "Title is missing"}</H1>
    </div>
  );
}
