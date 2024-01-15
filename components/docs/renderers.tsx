"use client";

import { setRendererCookie } from "@/app/actions";
import { renderers } from "@/docs-renderers";
import { cn } from "@/lib/utils";
import { FC, useEffect, useState } from "react";

interface RenderersProps {
  activeRenderer: string;
}

export const Renderers: FC<RenderersProps> = ({ activeRenderer }) => {
  const [state, setState] = useState<null | string>(null);

  useEffect(() => {
    // setTimeout(() => {
    //   setState(renderers[1].id);
    // }, 1000);
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((item) => item.startsWith("sb-docs-renderer="));
    if (cookie) {
      const [, value] = cookie.split("=");
      setState(value);
    }
  }, []);

  return (
    <div className="flex gap-2 mb-8">
      {renderers.slice(0, 4).map((renderer) => (
        <form action={setRendererCookie} key={renderer.id}>
          <input type="hidden" name="renderer" value={renderer.id} />
          <button
            className={cn(
              "inline-flex items-center justify-center h-7 rounded border border-zinc-300 text-sm px-2 hover:border-blue-500 transition-colors text-zinc-800 hover:text-blue-500",
              renderer.id === state && "border-blue-500 text-blue-500"
            )}
          >
            {renderer.title}
          </button>
        </form>
      ))}
    </div>
  );
};
