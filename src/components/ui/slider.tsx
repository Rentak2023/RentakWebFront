"use client";

import { Slider as SliderPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

const Slider = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  ref?: React.RefObject<React.ComponentRef<typeof SliderPrimitive.Root>>;
}) => {
  const initialValue = Array.isArray(props.value)
    ? props.value
    : [props.min, props.max];

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-slate-100">
        <SliderPrimitive.Range className="bg-primary-800 absolute h-full" />
      </SliderPrimitive.Track>

      {initialValue.map((value) => (
        <React.Fragment key={value}>
          <SliderPrimitive.Thumb className="border-primary-800 focus-visible:outline-hidden focus-visible:ring-primary-800 block size-5 rounded-full border-2 bg-white ring-offset-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
        </React.Fragment>
      ))}
    </SliderPrimitive.Root>
  );
};
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
