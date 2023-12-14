"use client";

import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { cn, container } from "@/lib/utils";
import { Fragment } from "react";
import { Sidebar } from "@/components/sidebar/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { title: "Version 7.6", href: "/releases/7.6" },
  { title: "Version 7.5", href: "/releases/7.5" },
  { title: "Version 7.4", href: "/releases/7.4" },
  { title: "Version 7.3", href: "/releases/7.3" },
  { title: "Version 7.2", href: "/releases/7.2" },
  { title: "Version 7.1", href: "/releases/7.1" },
  { title: "Version 7.0", href: "/releases/7.0" },
  { title: "Version 6.5", href: "/releases/6.5" },
  { title: "Version 6.4", href: "/releases/6.4" },
  { title: "Version 6.3", href: "/releases/6.3" },
  { title: "Version 6.2", href: "/releases/6.2" },
  { title: "Version 6.1", href: "/releases/6.1" },
  { title: "Version 6.0", href: "/releases/6.0" },
  { title: "Version 5.3", href: "/releases/5.3" },
  { title: "Version 5.2", href: "/releases/5.2" },
  { title: "Version 5.1", href: "/releases/5.1" },
  { title: "Version 5.0", href: "/releases/5.0" },
];

export default function Home({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const pathname = usePathname();

  console.log(slug);

  return (
    <Fragment>
      <Header variant="system" />
      <main className={cn(container, "lg:pl-5 lg:pr-8 flex gap-4")}>
        <Sidebar>
          <div className="flex flex-col border-t border-zinc-200 mt-4 pt-4">
            {nav.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "flex items-center text-sm h-8 text-zinc-600 hover:text-blue-500 transition-colors px-2",
                  item.href === pathname && "text-blue-500"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </Sidebar>
        <div className="w-full flex-1 min-h-[1400px] py-12">
          <h1 className="text-4xl mt-0 mb-6 font-bold">
            Storybook {slug} - November 2023
          </h1>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
}
