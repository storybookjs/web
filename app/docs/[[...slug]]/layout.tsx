import type { Metadata } from "next";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import Image from "next/image";
import { Sidebar } from "@/components/sidebar/sidebar";
import { TableOfContent } from "@/components/table-of-content";
import { cn, container } from "@/lib/utils";
import { NavDocs } from "@/components/sidebar/nav-docs";
import { getNullableVersion, getVersion } from "@/lib/get-version";
import { Fragment } from "react";
import { generateDocsTree } from "@/lib/get-tree";

export const metadata: Metadata = {
  title: "Storybook",
  description:
    "Storybook is a frontend workshop for building UI components and pages in isolation. Thousands of teams use it for UI development, testing, and documentation. It's open source and free.",
};

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string[] };
}) {
  // Get the latest version
  const activeVersionForPath = getVersion(params.slug);
  const activeVersionForSlug = getNullableVersion(params.slug);

  // Get the tree for the version
  const tree = generateDocsTree({
    pathToFiles: `content/docs/${activeVersionForPath?.id}/docs`,
    activeVersion: activeVersionForSlug,
  });

  return (
    <Fragment>
      <Header variant="system" tree={tree} />
      <Image
        src="/bubbles.png"
        alt="Storybook Docs"
        width={1800}
        height={339}
        className="w-full absolute top-0 left-0 -z-10"
      />
      <main className={cn(container, "md:pl-5 lg:pr-8 flex gap-4")}>
        <Sidebar>
          <NavDocs tree={tree} activeVersion={activeVersionForPath} />
        </Sidebar>
        <div className="w-full flex-1 min-h-[1400px] py-12">{children}</div>
        <TableOfContent />
      </main>
      <Footer />
    </Fragment>
  );
}
