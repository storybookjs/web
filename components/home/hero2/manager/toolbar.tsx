import {
  GridAltIcon,
  GrowIcon,
  OutlineIcon,
  RulerIcon,
  ShareAltIcon,
  SyncIcon,
  ZoomIcon,
  ZoomOutIcon,
  ZoomResetIcon,
} from "@storybook/icons";
import { FC, ReactNode } from "react";
import { motion } from "framer-motion";

export const Toolbar: FC = () => {
  return (
    <motion.div
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      exit={{ y: -40 }}
      className="h-10 border-b border-b-[#D9E0E6] w-full flex items-center px-2 justify-between"
    >
      <div className="flex">
        <ToolbarButton>
          <SyncIcon />
        </ToolbarButton>
        <ToolbarButton>
          <ZoomIcon />
        </ToolbarButton>
        <ToolbarButton>
          <ZoomOutIcon />
        </ToolbarButton>
        <ToolbarButton>
          <ZoomResetIcon />
        </ToolbarButton>
        <ToolbarButton>
          <GrowIcon />
        </ToolbarButton>
        <div className="w-px bg-[#D9E0E6] h-6 mx-2" />
        <ToolbarButton>
          <RulerIcon />
        </ToolbarButton>
        <ToolbarButton>
          <GridAltIcon />
        </ToolbarButton>
        <ToolbarButton>
          <OutlineIcon />
        </ToolbarButton>
      </div>
      <ToolbarButton>
        <ShareAltIcon />
      </ToolbarButton>
    </motion.div>
  );
};

const ToolbarButton: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="text-[#73828C] w-7 h-7 flex items-center justify-center">
      {children}
    </div>
  );
};
