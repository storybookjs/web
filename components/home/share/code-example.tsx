import React, { FC, ReactNode } from "react";
// import { styled } from '@storybook/theming';
// import { Highlight } from '@storybook/design-system';
// import { styles } from '@storybook/components-marketing';

// const { typography, color, breakpoints } = styles;

// const StyledHighlight = styled(Highlight)`
//   width: 100%;
//   height: 100%;
//   flex: 1 1 auto;
//   min-height: 0;

//   && {
//     code[class*='language-'],
//     pre[class*='language-'] {
//       color: #ccc;
//       font-family: ${typography.type.code};
//       background: none;
//       font-size: 1em;
//       text-align: left;
//       white-space: pre;
//       word-spacing: normal;
//       word-break: normal;
//       word-wrap: normal;
//       line-height: 1.5;

//       -moz-tab-size: 4;
//       -o-tab-size: 4;
//       tab-size: 4;

//       -webkit-hyphens: none;
//       -moz-hyphens: none;
//       -ms-hyphens: none;
//       hyphens: none;
//     }

//     /* Code blocks */
//     pre[class*='language-'] {
//       padding: 8px;
//       margin: 0;
//       overflow: auto;
//       width: 100%;
//       height: 100%;
//       border-top-left-radius: 0;
//       border-top-right-radius: 0;
//       border-bottom-left-radius: 8px;
//       border-bottom-right-radius: 8px;
//     }

//     @media (min-width: ${breakpoints[1]}px) {
//       pre[class*='language-'] {
//         padding: 15px;
//       }
//     }

//     :not(pre) > code[class*='language-'],
//     pre[class*='language-'] {
//       background: #232a35;
//     }

//     /* Inline code */
//     :not(pre) > code[class*='language-'] {
//       padding: 0.1em;
//       border-radius: 0.3em;
//       white-space: normal;
//     }

//     .token.comment,
//     .token.block-comment,
//     .token.prolog,
//     .token.doctype,
//     .token.cdata {
//       color: #999;
//     }

//     .token.punctuation {
//       color: #ccc;
//     }

//     .token.tag,
//     .token.attr-name,
//     .token.namespace,
//     .token.deleted {
//       color: #e2777a;
//     }

//     .token.function-name {
//       color: #6196cc;
//     }

//     .token.boolean,
//     .token.number,
//     .token.function {
//       color: #f08d49;
//     }

//     .token.property,
//     .token.class-name,
//     .token.constant,
//     .token.symbol {
//       color: #f8c555;
//     }

//     .token.selector,
//     .token.important,
//     .token.atrule,
//     .token.keyword,
//     .token.builtin {
//       color: #cc99cd;
//     }

//     .token.string,
//     .token.char,
//     .token.attr-value,
//     .token.regex,
//     .token.variable {
//       color: #7ec699;
//     }

//     .token.operator,
//     .token.entity,
//     .token.url {
//       color: #67cdcc;
//     }

//     .token.operator {
//       background: transparent;
//     }

//     .token.important,
//     .token.bold {
//       font-weight: bold;
//     }
//     .token.italic {
//       font-style: italic;
//     }

//     .token.entity {
//       cursor: help;
//     }

//     .token.inserted {
//       color: green;
//     }
//   }
// `;

interface CodeExampleProps {
  fileName?: string;
  children: ReactNode;
  language:
    | "mdx"
    | "bash"
    | "javascript"
    | "typescript"
    | "json"
    | "css"
    | "yaml"
    | "markdown"
    | "md"
    | "jsx"
    | "tsx";
}

export const CodeExample: FC<CodeExampleProps> = ({
  language,
  fileName,
  children,
  ...props
}) => (
  <div
    className="w-full max-w-[800px] h-[550px] text-[10px] sm:h-[550px] sm:text-sm lg:text-md border border-zinc-600 rounded-lg overflow-hidden flex flex-col shadow-md"
    {...props}
  >
    <div className="flex-none relative bg-[#1d1f24] border-b border-zinc-600 px-[11px] py-3 flex gap-2">
      <div className="w-[10px] h-10px] rounded-[50%] bg-[#fc521f]" />
      <div className="w-[10px] h-10px] rounded-[50%] bg-[#ffae00]" />
      <div className="w-[10px] h-10px] rounded-[50%] bg-[#66bf3c]" />
      {fileName && (
        <div className="text-zinc-800 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-ellipsis overflow-hidden text-xs sm:text-sm">
          {fileName}
        </div>
      )}
    </div>
    {/* <StyledHighlight key={fileName} language={language}>
      {children}
    </StyledHighlight> */}
  </div>
);
