import { FC } from "react";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { Panel } from "./panel";
import { AnimatePresence } from "framer-motion";

export const Manager: FC<{ slide: number }> = ({ slide }) => {
  return (
    <div className="flex h-[720px] rounded-b-md overflow-hidden">
      <Sidebar />
      <div className="w-full flex-1 h-full bg-white relative">
        <AnimatePresence>
          {slide !== 2 && (
            <>
              <Toolbar />
              <Panel />
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
