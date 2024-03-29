import { LinkIcon } from "@storybook/icons";
import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from "react";

type H1Props = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;
export const H1 = ({ children, id }: H1Props) => {
  return (
    <h1 className="relative text-4xl mt-0 mb-6 font-bold" data-docs-heading>
      <div id={id} className="absolute -translate-y-24" />
      <a
        href={`#${id}`}
        className="text-black group-hover:text-blue-600 transition-colors duration-200"
      >
        {children}
        <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <LinkIcon />
        </span>
      </a>
    </h1>
  );
};
