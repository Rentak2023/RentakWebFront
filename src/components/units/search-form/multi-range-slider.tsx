import { useTranslations } from "next-intl";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

type MultiRangeSliderProps = {
  min: number;
  max: number;
};

function MultiRangeSlider({ min, max }: MultiRangeSliderProps) {
  // eslint-disable-next-line react-compiler/react-compiler
  "use no memo";

  const t = useTranslations("units");
  const form = useFormContext();

  const minValue = form.watch("price_from");
  const maxValue = form.watch("price_to");

  const handleValueChange = (newValues: Array<number>) => {
    form.setValue("price_from", newValues[0]);
    form.setValue("price_to", newValues[1]);
  };

  return (
    <div>
      <p className="font-medium text-slate-600">{t("priceRange")}</p>

      <div className="mt-4">
        <Slider
          defaultValue={[minValue, maxValue]}
          minStepsBetweenThumbs={10}
          max={max}
          min={min}
          step={500}
          onValueChange={handleValueChange}
          className={cn("w-full")}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <ol className="flex w-full items-center gap-3">
          <li className="flex h-10 w-full items-center justify-between rounded-md border px-3">
            <span>{minValue}</span>
            <span>EGP</span>
          </li>
          <li className="flex h-10 w-full items-center justify-between rounded-md border px-3">
            <span>{maxValue}</span>
            <span>EGP</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default MultiRangeSlider;
