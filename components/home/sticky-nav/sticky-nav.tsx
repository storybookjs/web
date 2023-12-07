import React from "react";
import { motion } from "framer-motion";
import { ArrowUpIcon } from "@storybook/icons";
import { Button } from "../../ui/button";
import Link from "next/link";
import { MobileMenu } from "./mobile-menu";

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
  { id: "develop", label: "Develop", href: "#develop" },
  { id: "test", label: "Test", href: "#test" },
  { id: "document", label: "Document", href: "#document" },
  { id: "share", label: "Share", href: "#share" },
  { id: "automate", label: "Automate", href: "#automate" },
  { id: "who", label: "Who's it for", href: "#who" },
];

export const StickyNav = ({
  isVisible,
  animationDisabled = false,
  activeSection,
  ...props
}: StickyNavProps) => {
  const activeItem = items.find((item) => item.id === activeSection);

  return (
    <motion.div
      className="bg-black sticky h-10 md:h-18 top-0 z-50"
      animate={{ opacity: isVisible ? 1 : 0 }}
      {...props}
    >
      <section className="max-w-8xl mx-auto px-4 h-full flex items-center justify-between">
        <MobileMenu items={items} label={activeItem?.label || items[0].label} />
        <div className="hidden md:flex items-center gap-2">
          {items.map((item) => (
            <Button
              key={item.id}
              asChild
              variant="ghostHome"
              size="md"
              active={activeSection === item.id ? "home" : undefined}
            >
              <a href={item.href}>{item.label}</a>
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-5">
          <Button
            asChild
            variant="ghostHome"
            size="md"
            className="hidden md:block"
          >
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
