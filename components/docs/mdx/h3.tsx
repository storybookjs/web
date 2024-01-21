import { LinkIcon } from "@storybook/icons";
import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from "react";

type H3Props = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export const H3 = ({ children, id }: H3Props) => {
  return (
    <h3 className="relative text-xl mt-10 mb-4 font-bold" data-docs-heading>
      <div id={id} className="absolute -translate-y-24" />
      <a
        href={`#${id}`}
        className="text-black group-hover:text-blue-500 transition-colors duration-200"
      >
        {children}
        <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <LinkIcon />
        </span>
      </a>
    </h3>
  );
};
