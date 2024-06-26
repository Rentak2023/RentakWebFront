import { useTranslations } from "next-intl";
import {
  type ChangeEvent,
  type FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { type Control, useController } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

type MultiRangeSliderProps = {
  min: number;
  max: number;
  onChange: (name: string, value: string) => void;
  control: Control;
};

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({
  min,
  max,
  onChange,
  control,
}) => {
  const t = useTranslations("units");
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const { field: minField } = useController({
    name: "price_from",
    control,
  });

  const { field: maxField } = useController({
    name: "price_to",
    control,
  });

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (range.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  // Update form values only when minVal or maxVal change
  useEffect(() => {
    minField.onChange(minVal);
    onChange("price_from", String(minVal));
  }, [minVal]);

  useEffect(() => {
    maxField.onChange(maxVal);
    onChange("price_to", String(maxVal));
  }, [maxVal]);

  const handleMinChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Math.min(+event.target.value, maxVal - 1);
      setMinVal(value);
    },
    [maxVal],
  );

  const handleMaxChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(+event.target.value, minVal + 1);
      setMaxVal(value);
    },
    [minVal],
  );

  return (
    <div>
      <p className="mb-5 font-semibold text-[#777777]">{t("priceRange")}</p>

      <div className="filter-search-form relative mt-2">
        <div className="multi-range-slider-container">
          <FormField
            control={control}
            name="price_from"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    {...field}
                    value={minVal}
                    ref={minValRef}
                    onChange={handleMinChange}
                    className={cn("thumb thumb--zindex-3", {
                      "thumb--zindex-5": minVal > max - 100,
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="price_to"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    {...field}
                    value={maxVal}
                    ref={maxValRef}
                    onChange={handleMaxChange}
                    className="thumb thumb--zindex-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="slider__left-value font-medium text-primary-900">
            <p>{Math.floor(minVal / 1000)}k EGP</p>
          </div>
          <div className="slider__right-value font-medium text-primary-900">
            <p>{Math.floor(maxVal / 1000)}k EGP</p>
          </div>
          <div className="slider">
            <div className="slider__track border border-solid border-[#C4C7CD]" />
            <div ref={range} className="slider__range bg-[#777777]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
