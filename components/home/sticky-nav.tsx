import React from "react";
import { motion } from "framer-motion";
import { ArrowUpIcon } from "@storybook/icons";
import { Button } from "../ui/button";
import Link from "next/link";

interface StickyNavProps {
  isVisible?: boolean;
  animationDisabled?: boolean;
  activeSection:
    | "who"
    | "automate"
    | "share"
    | "document"
    | "test"
    | "develop"
    | null;
}

const items = [
  { id: "develop", label: "Develop", link: { url: "#develop" } },
  { id: "test", label: "Test", link: { url: "#test" } },
  { id: "document", label: "Document", link: { url: "#document" } },
  { id: "share", label: "Share", link: { url: "#share" } },
  { id: "automate", label: "Automate", link: { url: "#automate" } },
  { id: "who", label: "Who's it for", link: { url: "#who" } },
];

export const StickyNav = ({
  isVisible,
  animationDisabled = false,
  activeSection,
  ...props
}: StickyNavProps) => {
  // const activeItem = items.find((item) => item.id === activeSection);

  return (
    <motion.div
      className="bg-zinc-900 sticky h-10 md:h-18 top-0 z-50"
      animate={{ opacity: isVisible ? 1 : 0 }}
      {...props}
    >
      <section className="max-w-8xl mx-auto px-4 h-full flex justify-between">
        {/* TODO: Add mobile menu with Radix */}
        {/* <MobileMenu items={items} label={activeItem?.label || items[0].label} /> */}
        <div className="hidden md:flex items-center gap-2">
          {items.map((item) => (
            <Button
              key={item.id}
              asChild
              variant="ghostHome"
              size="md"
              active={activeSection === item.id ? "home" : undefined}
            >
              <a href={item.link.url}>{item.label}</a>
            </Button>
          ))}
        </div>
        <div className="flex w-full md:w-auto justify-between md:justify-normal items-center gap-5">
          <Button asChild variant="ghostHome" size="md">
            <a href="#page-top">
              <ArrowUpIcon />
              Jump to top
            </a>
          </Button>
          <Button size="sm" variant="solid" rounded="full" asChild>
            <Link href="/docs">Get started</Link>
          </Button>
        </div>
      </section>
    </motion.div>
  );
};
