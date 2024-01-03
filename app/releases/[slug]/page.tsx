import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { cn, container } from "@/lib/utils";
import { Fragment } from "react";
import { Sidebar } from "@/components/sidebar/sidebar";
import Link from "next/link";
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
    <Fragment>
      <Header variant="system" />
      <main className={cn(container, "lg:pl-5 lg:pr-8 flex gap-4")}>
        <Sidebar>
          <div className="flex flex-col border-t border-zinc-200 mt-4 pt-4">
            {releases
              .sort((a, b) => b.localeCompare(a))
              .map((release) => (
                <Link
                  key={release}
                  href={`/releases/${release}`}
                  className={cn(
                    "flex items-center text-sm h-8 text-zinc-600 hover:text-blue-500 transition-colors px-2",
                    release === slug && "text-blue-500"
                  )}
                >
                  Version {release}
                </Link>
              ))}
          </div>
        </Sidebar>
        <article className="w-full flex-1 py-12 max-w-3xl">
          <h1 className="text-4xl mt-0 mb-6 font-bold">
            {page?.frontmatter.title || "Page Not Found"}
          </h1>
          {page?.content}
        </article>
      </main>
      <Footer />
    </Fragment>
  );
}
