import { FC, ReactNode } from "react";
import { H1 } from "./mdx";
import { Tabs } from "./tabs";
import { cn } from "@/lib/utils";

interface Props {
  title?: string;
  isIndex: boolean;
  isApi: boolean;
  pathIndex: string;
  pathApi: string;
  content: ReactNode;
}

const renderers = [
  { id: "react", title: "React" },
  { id: "vue", title: "Vue" },
  { id: "angular", title: "angular" },
  { id: "web-components", title: "Web Components" },
  { id: "ember", title: "Ember" },
  { id: "html", title: "HTML" },
  { id: "svelte", title: "Svelte" },
  { id: "preact", title: "Preact" },
  { id: "qwik", title: "Qwik" },
  { id: "solid", title: "Solid" },
];

export const Article: FC<Props> = ({
  title,
  isIndex,
  isApi,
  pathIndex,
  pathApi,
  content,
}) => {
  const active = "react";

  return (
    <>
      <H1>{title || "Title is missing"}</H1>
      <div className="flex gap-2 mb-8">
        {renderers.slice(0, 4).map((renderer) => (
          <button
            className={cn(
              "inline-flex items-center justify-center h-7 rounded border border-zinc-300 text-sm px-2 hover:border-blue-500 transition-colors text-zinc-800 hover:text-blue-500",
              renderer.id === active && "border-blue-500 text-blue-500"
            )}
            key={renderer.id}
          >
            {renderer.title}
          </button>
        ))}
      </div>
      {(isIndex || isApi) && (
        <Tabs
          pathIndex={pathIndex}
          pathApi={pathApi}
          isIndex={isIndex}
          isApi={isApi}
        />
      )}
      <article>{content}</article>
    </>
  );
};
