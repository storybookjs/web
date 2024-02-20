import { FC } from "react";

export const Controls: FC = () => {
  return (
    <div>
      <div className="bg-[#F7F9FC] h-10 flex items-center px-4 text-[11px] tracking-widest uppercase font-bold text-[#2E3438] border-b border-b-[#D9E0E6]">
        Props
      </div>
      <div className="flex border-b border-b-[#D9E0E6]">
        <div className="text-[13px] w-1/2 sm:w-1/4 lg:w-[22%] pl-4 py-2">
          label
        </div>
        <div className="text-[13px] w-1/3 lg:w-[28%] py-2 hidden sm:block">
          Label of component
        </div>
        <div className="text-[13px] w-[25%] py-2 hidden lg:flex">
          <div className="bg-[#F6F9FC] border border-[#D9E0E6] h-5 px-1.5 rounded flex items-center">
            Choose time frame
          </div>
        </div>
        <div className="text-[13px] w-1/2 sm:w-1/3 lg:w-[25%] py-2 pr-4">
          <div className="border border-[#D9E0E6] rounded w-full h-7 flex items-center px-2">
            Usage frequency
          </div>
        </div>
      </div>
      <div className="flex border-b border-b-[#D9E0E6]">
        <div className="text-[13px] w-1/2 sm:w-1/4 lg:w-[22%] pl-4 py-2">
          startTime
        </div>
        <div className="text-[13px] w-1/3 lg:w-[28%] py-2 hidden sm:block">
          Start time in 24h notation
        </div>
        <div className="text-[13px] w-[25%] py-2 hidden lg:flex">
          <div className="bg-[#F6F9FC] border border-[#D9E0E6] h-5 px-1.5 rounded flex items-center">
            undefined
          </div>
        </div>
        <div className="text-[13px] w-1/2 sm:w-1/3 lg:w-[25%] py-2 pr-4">
          <div className="border border-[#D9E0E6] rounded w-full h-7 flex items-center px-2 text-[#73828C]">
            Edit string
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="text-[13px] w-1/2 sm:w-1/4 lg:w-[22%] pl-4 py-2">
          endTime
        </div>
        <div className="text-[13px] w-1/3 lg:w-[28%] py-2 hidden sm:block">
          End time in 24h notation
        </div>
        <div className="text-[13px] w-[25%] py-2 hidden lg:flex">
          <div className="bg-[#F6F9FC] border border-[#D9E0E6] h-5 px-1.5 rounded flex items-center">
            undefined
          </div>
        </div>
        <div className="text-[13px] w-1/2 sm:w-1/3 lg:w-[25%] py-2 pr-4">
          <div className="border border-[#D9E0E6] rounded w-full h-7 flex items-center px-2 text-[#73828C]">
            Edit string
          </div>
        </div>
      </div>
    </div>
  );
};
