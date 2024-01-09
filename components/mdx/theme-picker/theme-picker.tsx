"use client";

import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import { Button } from "../../ui/button";
import chroma from "chroma-js";
import { Logo } from "./logo";
import {
  BookmarkHollowIcon,
  BookmarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ComponentIcon,
} from "@storybook/icons";

export const ThemePicker: FC = () => {
  const [primaryColor, setPrimaryColor] = useState("#029cfd");

  const palette = chroma.valid(primaryColor)
    ? chroma.scale(["white", primaryColor, "black"]).colors(41)
    : null;

  const backgroundColor = palette
    ? chroma(palette[1]).desaturate(0.08).hex()
    : "#FFF";
  const borderColor = palette
    ? chroma(palette[6]).desaturate(0.4).hex()
    : "#D7E0E7";

  return (
    <div>
      <h1 className="text-2xl mb-1">Theme Picker</h1>
      <p className="mb-6">
        Choose one of our main colours or use the primary colour of your brand.
      </p>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="flex gap-3">
            {["#029cfd", "#ef4444", "#fbbf24", "#34d399", "#a78bfa"].map(
              (color) => {
                const isActive = primaryColor === color;
                return (
                  <div
                    key={color}
                    className={cn(
                      "w-6 h-6 rounded-full cursor-pointer",
                      color === "#029cfd" && "bg-[#029cfd]",
                      color === "#ef4444" && "bg-red-400",
                      color === "#fbbf24" && "bg-amber-400",
                      color === "#34d399" && "bg-emerald-400",
                      color === "#a78bfa" && "bg-purple-400",
                      isActive && "ring-2 ring-offset-2 ring-slate-300"
                    )}
                    onClick={() => setPrimaryColor(color)}
                  />
                );
              }
            )}
          </div>
          <input
            className="h-8 border border-slate-300 rounded px-3 w-32"
            placeholder="#029cfd"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
          />
        </div>
        <Button variant="solid" size="md">
          Copy theme
        </Button>
      </div>
      <div
        className="flex h-[420px] w-full rounded-lg overflow-hidden"
        style={{
          border: palette ? `1px solid ${palette[20]}` : "#D7E0E7",
        }}
      >
        <div
          className="w-[20%] h-full p-2 pt-3"
          style={{
            background: backgroundColor,
            borderRight: "1px solid",
            borderRightColor: borderColor,
          }}
        >
          <Logo className="mb-4 ml-1 w-[54%]" />
          <div className="flex items-center text-xs rounded-sm h-[22px] px-1 text-black gap-1">
            <ChevronRightIcon size={8} className="text-slate-500" />
            <ComponentIcon size={12} style={{ color: primaryColor }} /> Avatar
          </div>
          <div className="flex items-center text-xs rounded-sm h-[22px] px-1 text-black gap-1">
            <ChevronRightIcon size={8} className="text-slate-500" />
            <ComponentIcon size={12} style={{ color: primaryColor }} /> Badge
          </div>
          <div
            className="flex items-center text-xs rounded-sm h-[22px] pl-4 text-white gap-1"
            style={{
              background: primaryColor,
            }}
          >
            <BookmarkHollowIcon size={12} /> Button
          </div>
          <div className="flex items-center text-xs rounded-sm h-[22px] px-1 text-black gap-1">
            <ChevronRightIcon size={8} className="text-slate-500" />
            <ComponentIcon size={12} style={{ color: primaryColor }} /> Badge
          </div>
        </div>
        <div className="flex flex-col flex-1 h-full">
          <div
            className="h-6 w-full bg-white"
            style={{
              borderBottom: "1px solid",
              borderBottomColor: borderColor,
            }}
          ></div>
          <div className="flex-1"></div>
          <div
            className="h-6 w-full bg-white"
            style={{
              borderTop: "1px solid",
              borderTopColor: borderColor,
            }}
          ></div>
          <div
            className="h-[100px] w-full bg-white"
            style={{
              borderTop: "1px solid",
              borderTopColor: borderColor,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
