import { FC } from "react";
import { Button } from "../ui/button";
import { MenuIcon } from "@storybook/icons";
import { cn } from "@/lib/utils";

interface SubmenuProps {
  variant: "home" | "docs";
}

export const Submenu: FC<SubmenuProps> = ({ variant }) => {
  return (
    <div
      className={cn(
        "flex items-center p-4 lg:hidden gap-2",
        variant === "home" && "border-b border-zinc-700 text-white text-sm",
        variant === "docs" && "border-b border-zinc-200 dark:border-zinc-700"
      )}
    >
      <Button
        variant={variant === "home" ? "ghostHome" : "ghostSystem"}
        size="iconSm"
        className="min-[864px]:hidden"
      >
        <MenuIcon />
      </Button>
      Submenu
    </div>
  );
};
