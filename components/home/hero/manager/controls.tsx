import { cn } from "@/lib/tailwind";
import { FC } from "react";

const content = [
  {
    label: "label",
    description: "Label of component",
    default: "Choose time frame",
    control: "Usage frequency",
  },
  {
    label: "startTime",
    description: "Start time in 24h notation",
    default: "undefined",
    control: "Edit string",
    muted: true,
  },
  {
    label: "endTime",
    description: "End time in 24h notation",
    default: "undefined",
    control: "Edit string",
    muted: true,
  },
];

export const Controls: FC<{ isPanel?: boolean }> = ({ isPanel = false }) => {
  return (
    <div>
      <div
        className={cn(
          "bg-[#F7F9FC] h-10 flex items-center px-4 text-[11px] tracking-widest uppercase font-bold text-[#2E3438] border-b border-b-[#D9E0E6]",
          isPanel && "hidden sm:flex"
        )}
      >
        Props
      </div>
      {content.map((item) => (
        <div key={item.label} className="flex border-b border-b-[#D9E0E6]">
          <div className="text-[13px] w-1/2 md:w-[28%] lg:w-[22%] pl-4 py-2">
            {item.label}
          </div>
          <div className="text-[13px] w-[38%] lg:w-[28%] hidden md:block py-2">
            {item.description}
          </div>
          <div className="text-[13px] w-[25%] hidden lg:flex py-2">
            <div className="bg-[#F6F9FC] border border-[#D9E0E6] h-5 px-1.5 rounded flex items-center">
              {item.default}
            </div>
          </div>
          <div className="text-[13px] w-1/2 md:w-1/3 lg:w-[25%] flex py-2 pr-4">
            <div
              className={cn(
                "border border-[#D9E0E6] rounded w-full h-7 flex items-center px-2",
                item.muted && "text-[#73828C]"
              )}
            >
              {item.control}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
