import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { FC } from "react";

const footerVariants = cva(
  "w-full min-h-[400px] lg:border-t lg:border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90",
  {
    variants: {
      variant: {
        default: "bg-slate-50 text-slate-800",
        home: "bg-zinc-900 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

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
