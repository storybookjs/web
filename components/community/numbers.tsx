"use client";

import { FC } from "react";

export const Numbers: FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 my-12 pb-12 border-b border-b-zinc-300">
      {[
        {
          number: "17.01m",
          label: "Downloads/month",
        },
        {
          number: "400+",
          label: "Integrations",
        },
        {
          number: "81,378",
          label: "GitHub Stars",
        },
        {
          number: "2,137",
          label: "Contributors",
        },
        {
          number: "20,250",
          label: "Discord members",
        },
        {
          number: "18,350",
          label: "Twitter followers",
        },
        {
          number: "6,440",
          label: "YouTube subscribers",
        },
      ].map(({ number, label }) => (
        <div className="" key={label}>
          <div className="text-md font-bold">{number}</div>
          <div className="text-sm text-zinc-500">{label}</div>
        </div>
      ))}
    </div>
  );
};
