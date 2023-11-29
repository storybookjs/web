import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { FC } from "react";

const footerVariants = cva("w-full min-h-[400px]", {
  variants: {
    variant: {
      default:
        "bg-slate-50 text-slate-800 border-t border-zinc-200 dark:bg-zinc-900 dark:text-white dark:border-zinc-700",
      home: "bg-zinc-900 text-white border-t border-zinc-700",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface FooterProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof footerVariants> {}

export const Footer: FC<FooterProps> = ({ variant }) => {
  return (
    <div className={cn(footerVariants({ variant }))}>
      <div className="max-w-8xl mx-auto px-4 lg:px-8 py-12">Footer</div>
    </div>
  );
};
