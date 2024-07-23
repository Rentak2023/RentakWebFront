import type React from "react";

import { cn } from "@/lib/utils";

type SectionTitleProps = {
  text: React.ReactNode;
  className?: string;
};

function SectionTitle({ text, className }: SectionTitleProps) {
  return (
    <h2
      className={cn(
        "text-center text-3xl font-semibold leading-7 tracking-tight text-slate-900",
        className,
      )}
    >
      {text}
    </h2>
  );
}

export default SectionTitle;
