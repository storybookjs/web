import { LinkIcon } from "@storybook/icons";
import { DetailedHTMLProps, HTMLAttributes } from "react";

type H2Props = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export const H2 = ({ children, id }: H2Props) => {
  return (
    <h2
      className="text-2xl mt-0 mb-6 font-bold group"
      id={id}
      data-docs-heading
    >
      <a
        href={`#${id}`}
        className="text-black group-hover:text-blue-500 transition-colors duration-200"
      >
        {children}
        <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <LinkIcon />
        </span>
      </a>
    </h2>
  );
};
