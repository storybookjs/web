import { FC } from "react";
import { Button } from "../ui/button";
import { MenuIcon } from "@storybook/icons";

interface MobileMenuProps {
  variant: "home" | "docs";
}

export const MobileMenu: FC<MobileMenuProps> = ({ variant }) => {
  return (
    <>
      <Button
        variant={variant === "home" ? "ghostHome" : "ghostSystem"}
        size="iconSm"
        className="min-[864px]:hidden"
      >
        <MenuIcon />
      </Button>
    </>
  );
};
