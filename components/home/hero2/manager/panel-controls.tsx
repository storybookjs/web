import { FC } from "react";
import { motion } from "framer-motion";
import { Controls } from "./controls";
import { CloseIcon, SidebarAltIcon, UndoIcon } from "@storybook/icons";

export const PanelControls: FC = () => {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
      className="absolute bottom-0 left-0 w-full h-[34%] sm:h-[40%] border-t border-t-[#D9E0E6] text-black"
    >
      <div className="w-full h-10 flex border-b border-b-[#D9E0E6] justify-between items-center">
        <div className="flex h-full">
          <div className="h-full border-b-2 border-b-blue-500 flex items-center text-sm px-4 font-bold text-blue-500">
            Controls
          </div>
          {["Interactions", "Visual tests", "Accessibility", "Design"].map(
            (label) => (
              <div
                key={label}
                className="h-full flex items-center text-sm px-4 font-bold text-[#76828B]"
              >
                {label}
              </div>
            )
          )}
        </div>
        <div className="flex text-[#76828B] pr-2">
          <div className="w-7 h-7 flex items-center justify-center">
            <SidebarAltIcon />
          </div>
          <div className="w-7 h-7 flex items-center justify-center">
            <CloseIcon />
          </div>
        </div>
      </div>
      <div className="flex h-10 items-center border-b border-b-[#D9E0E6]">
        <div className="text-[13px] w-[22%] pl-4">Name</div>
        <div className="text-[13px] w-[28%]">Description</div>
        <div className="text-[13px] w-[25%]">Default</div>
        <div className="text-[13px] w-[25%] flex justify-between items-center pr-4 ">
          <div>Controls</div>
          <UndoIcon className="text-[#73828C]" />
        </div>
      </div>
      <Controls />
    </motion.div>
  );
};
