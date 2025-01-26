"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import { useLocale } from "next-intl";
import * as React from "react";

import getLocaleDirection, { cn } from "@/lib/utils";

const Progress = ({
  ref,
  className,
  value,
  ...props
}: React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  ref?: React.RefObject<React.ComponentRef<typeof ProgressPrimitive.Root>>;
}) => {
  const locale = useLocale();
  const dir = getLocaleDirection(locale);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-slate-100",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "bg-linear-to-r from-primary-600 to-primary-600/50 size-full flex-1 rounded-full transition-all",
          dir === "rtl" && "-scale-100",
        )}
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
};
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
