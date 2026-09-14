"use client";

import { useFormatter, useTranslations } from "next-intl";
import { parseAsInteger, useQueryStates } from "nuqs";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PriceRangeFilterProps = {
  min: number;
  max: number;
};

function generatePriceOptions(min: number, max: number): Array<number> {
  if (min >= max) return [min];

  const diff = max - min;
  let step = 5000;
  if (diff <= 30_000) step = 2500;
  else if (diff <= 100_000) step = 5000;
  else if (diff <= 300_000) step = 10_000;
  else if (diff <= 1_000_000) step = 25_000;
  else if (diff <= 3_000_000) step = 50_000;
  else step = 100_000;

  const start = Math.floor(min / step) * step;
  const end = Math.ceil(max / step) * step;

  const prices: Array<number> = [];
  for (let price = start; price <= end; price += step) {
    if (price >= min && price <= max) {
      prices.push(price);
    }
  }

  if (!prices.includes(min)) prices.unshift(min);
  if (!prices.includes(max)) prices.push(max);

  return [...new Set(prices)].sort((a, b) => a - b);
}

export default function PriceRangeFilter({ min, max }: PriceRangeFilterProps) {
  const t = useTranslations("units");
  const formatter = useFormatter();
  const form = useFormContext();

  const [searchParams, setSearchParams] = useQueryStates({
    price_from: parseAsInteger,
    price_to: parseAsInteger,
    page: parseAsInteger.withDefault(1),
  });

  const [selectedMin, setSelectedMin] = useState<string>(
    searchParams.price_from ? String(searchParams.price_from) : "",
  );
  const [selectedMax, setSelectedMax] = useState<string>(
    searchParams.price_to ? String(searchParams.price_to) : "",
  );

  useEffect(() => {
    setSelectedMin(
      searchParams.price_from ? String(searchParams.price_from) : "",
    );
    setSelectedMax(searchParams.price_to ? String(searchParams.price_to) : "");
  }, [searchParams.price_from, searchParams.price_to]);

  const priceOptions = useMemo(() => {
    return generatePriceOptions(min, max);
  }, [min, max]);

  const formatPrice = (value: number) => {
    return `${formatter.number(value, "numbers")} ${t("egp")}`;
  };

  const handleApply = () => {
    const minVal = selectedMin ? Number(selectedMin) : null;
    const maxVal = selectedMax ? Number(selectedMax) : null;

    form.setValue("price_from", minVal ?? min);
    form.setValue("price_to", maxVal ?? max);

    setSearchParams({
      price_from: minVal,
      price_to: maxVal,
      page: 1,
    });
  };

  return (
    <div>
      <p className="font-medium text-slate-600">{t("priceRange")}</p>

      <div className="mt-4 flex items-center gap-2">
        <Select
          value={selectedMin}
          onValueChange={(val) => {
            setSelectedMin(val);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("minPrice")} />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {priceOptions.map((price) => {
              const isDisabled = selectedMax
                ? price > Number(selectedMax)
                : false;
              return (
                <SelectItem
                  key={`min-${price}`}
                  value={String(price)}
                  disabled={isDisabled}
                >
                  {formatPrice(price)}
                </SelectItem>
              );
            })}
            <Button
              className="w-full px-2"
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => {
                setSelectedMin("");
              }}
            >
              {t("clear")}
            </Button>
          </SelectContent>
        </Select>

        <span className="font-medium text-slate-400">—</span>

        <Select
          value={selectedMax}
          onValueChange={(val) => {
            setSelectedMax(val);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("maxPrice")} />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {priceOptions.map((price) => {
              const isDisabled = selectedMin
                ? price < Number(selectedMin)
                : false;
              return (
                <SelectItem
                  key={`max-${price}`}
                  value={String(price)}
                  disabled={isDisabled}
                >
                  {formatPrice(price)}
                </SelectItem>
              );
            })}
            <Button
              className="w-full px-2"
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => {
                setSelectedMax("");
              }}
            >
              {t("clear")}
            </Button>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="button"
        onClick={handleApply}
        variant="default"
        size="sm"
        className="mt-3 w-full"
      >
        {t("apply")}
      </Button>
    </div>
  );
}
