import {
  PortableText,
  PortableTextBlock,
  PortableTextReactComponents,
} from 'next-sanity';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkRehype from 'remark-rehype';
import { rehypePrettyCodeOptions } from '@repo/ui';
import rehypeStringify from 'rehype-stringify';

const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children }) => <h1 className="text-2xl">{children}</h1>,
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 text-2xl font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-4 mt-10 text-xl font-bold">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-purple-500">{children}</blockquote>
    ),
    normal: ({ children }) => (
      <p className="my-5 text-base leading-7 text-black">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 ml-10 list-outside list-disc">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 ml-10 list-outside list-decimal">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="my-2 pl-2">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/')
        ? 'noreferrer noopener'
        : undefined;
      return (
        <a href={value.href} rel={rel}>
          {children}
        </a>
      );
    },
  },
  types: {
    code: async (props) => {
      const highlightedCode = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypePrettyCode, rehypePrettyCodeOptions as never)
        .use(rehypeStringify).process(`
\`\`\`tsx
${props.value.code}
\`\`\`
        `);

      return (
        <div className="rounded bg-slate-100 p-6 text-sm [&_code]:bg-transparent">
          <section
            dangerouslySetInnerHTML={{
              __html: String(highlightedCode),
            }}
          />
        </div>
      );
    },
  },
};

export default async function Body({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={portableTextComponents} />;
}
