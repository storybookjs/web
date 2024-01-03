import { getRelease } from "@/lib/getRelease";
import fs from "fs";

export default async function Home({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const page = await getRelease(slug || "");
  const releases: string[] = [];

  fs.readdirSync("content/releases").forEach((f) => {
    releases.push(f.replace(".md", ""));
  });

  return (
    <main className="w-full max-w-4xl mx-auto px-4 lg:px-8 mt-10">
      <h1 className="text-4xl mt-0 mb-6 font-bold">
        {page?.frontmatter.title || "Page Not Found"}
      </h1>
      <article>{page?.content}</article>
    </main>
  );
}
