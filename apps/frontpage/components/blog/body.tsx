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
import { Tweet } from 'react-tweet';
import imageUrlBuilder from '@sanity/image-url';

import { client } from '../../lib/sanity/client';
import { cn } from '@repo/utils';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children }) => <h1 className="text-2xl">{children}</h1>,
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-2xl font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 mb-4 text-xl font-bold">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-purple-500">{children}</blockquote>
    ),
    normal: ({ children }) => (
      <p className="my-5 text-base leading-7 text-black dark:text-white">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 ml-10 list-disc list-outside">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 ml-10 list-decimal list-outside">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-2 my-2">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/')
        ? 'noreferrer noopener'
        : undefined;
      return (
        <a href={value.href} rel={rel} className="text-blue-500">
          {children}
        </a>
      );
    },
    code: ({ children }) => (
      <code className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white">
        {children}
      </code>
    ),
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
        <div className="overflow-x-scroll rounded bg-slate-100 p-6 text-sm dark:bg-slate-800 [&_code]:bg-transparent">
          <section
            dangerouslySetInnerHTML={{
              __html: String(highlightedCode),
            }}
          />
        </div>
      );
    },
    tweet: ({ value }) => (
      <div className="flex items-center justify-center">
        <Tweet id={value.tweetId} />
      </div>
    ),
    'image-block': ({ value }) => {
      console.log(value);
      return (
        <div className="flex justify-center my-8">
          <img
            className={cn(
              'rounded-lg',
              value.large &&
                'md:w-[720px] md:max-w-[720px] lg:w-[960px] lg:max-w-[960px]',
            )}
            src={urlFor(value.image).url()}
          />
        </div>
      );
    },
  },
};

export default async function Body({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={portableTextComponents} />;
}
