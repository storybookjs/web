import { MDXRemote } from 'next-mdx-remote/rsc';

const components = {
  h1: (props) => (
    <h1 {...props} className="text-4xl">
      {props.children}
    </h1>
  ),
};

export function AddonReadme({ addon }: { addon: Addon }) {
  const readme = addon.readme as string;

  return (
    <div className="min-w-0 flex-1">
      {addon.readme && <MDXRemote source={readme} components={components} />}
      {/* {addon.readme ? (
        <div
          className="[&_pre]:w-full [&_pre]:overflow-scroll"
          dangerouslySetInnerHTML={{ __html: addon.readme }}
        />
      ) : null} */}
    </div>
  );
}
