import { FC } from "react";
import { Button } from "../ui/button";
import { MenuIcon } from "@storybook/icons";

export const MobileMenu: FC<HeaderProps> = ({ variant }) => {
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
