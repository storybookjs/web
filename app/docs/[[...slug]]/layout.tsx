import type { Metadata } from "next";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import Image from "next/image";
import { getTree } from "@/lib/getTree";
import { Sidebar } from "@/components/sidebar/sidebar";
import { TableOfContent } from "@/components/table-of-content";
import { cn, container } from "@/lib/utils";
import { NavDocs } from "@/components/sidebar/nav-docs";
import { getVersion } from "@/lib/getVersion";
import { Fragment } from "react";

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
  const activeVersion = getVersion(params.slug);

  // Get the tree for the version
  const tree = await getTree(activeVersion.id);

  return (
    <Fragment>
      <Header variant="system" />
      <Image
        src="/bubbles.png"
        alt="Storybook Docs"
        width={1800}
        height={339}
        className="w-full absolute top-0 left-0 -z-10"
      />
      <main className={cn(container, "lg:pl-5 lg:pr-8 flex gap-4")}>
        <Sidebar>
          <NavDocs tree={tree} activeVersion={activeVersion} />
        </Sidebar>
        <div className="w-full flex-1 min-h-[1400px] py-12">{children}</div>
        <TableOfContent />
      </main>
      <Footer />
    </Fragment>
  );
}
