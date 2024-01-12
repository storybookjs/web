import { FC } from "react";
import { Button } from "../ui/button";
import { MenuIcon } from "@storybook/icons";
import { cn } from "../../lib/utils";
import { usePathname } from "next/navigation";

export const Submenu: FC<HeaderProps> = ({ variant, tree }) => {
  const pathname = usePathname();
  const activeSection = tree?.find((node) => node.slug.startsWith(pathname));

  let title = "";
  if (activeSection?.sidebar?.title) {
    title = activeSection.sidebar.title;
  } else if (activeSection?.title) {
    title = activeSection.title;
  }

  return (
    <div
      className={cn(
        "flex items-center p-4 md:hidden gap-2 text-sm",
        variant === "home" && "border-b border-zinc-700 text-white",
        variant === "system" && "border-b border-zinc-200 dark:border-zinc-700"
      )}
    >
      <Button
        variant={variant === "home" ? "ghostHome" : "ghostSystem"}
        size="iconSm"
      >
        <MenuIcon />
      </Button>
      <div className="font-bold">{title}</div>
    </div>
  );
};
