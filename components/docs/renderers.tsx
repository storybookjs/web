import { setRendererCookie } from "@/app/actions";
import { renderers } from "@/docs-renderers";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface RenderersProps {
  activeRenderer: string;
}

export const Renderers: FC<RenderersProps> = ({ activeRenderer }) => {
  return (
    <div className="flex gap-2 mb-8">
      {renderers.slice(0, 4).map((renderer) => (
        <form action={setRendererCookie} key={renderer.id}>
          <input type="hidden" name="renderer" value={renderer.id} />
          <button
            className={cn(
              "inline-flex items-center justify-center h-7 rounded border border-zinc-300 text-sm px-2 hover:border-blue-500 transition-colors text-zinc-800 hover:text-blue-500",
              renderer.id === activeRenderer && "border-blue-500 text-blue-500"
            )}
          >
            {renderer.title}
          </button>
        </form>
      ))}
    </div>
  );
};
