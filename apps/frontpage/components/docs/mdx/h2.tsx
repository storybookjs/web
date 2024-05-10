import { LinkIcon } from "@storybook/icons";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

type H2Props = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export function H2({ children, id }: H2Props) {
  return (
    <h2
      className="relative text-2xl mt-0 mb-6 font-bold group"
      data-docs-heading
    >
      <div className="absolute -translate-y-24" id={id} />
      <a
        className="text-black group-hover:text-blue-600 transition-colors duration-200"
        href={`#${id}`}
      >
        {children}
        <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <LinkIcon />
        </span>
      </a>
    </h2>
  );
}
