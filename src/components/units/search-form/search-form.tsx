"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { minMaxPriceQuery } from "@/queries/units";

import { type FormValues } from "../types";
import CitiesAndRegions from "./cities-and-regions";
import FinishingTypes from "./finishing-types";
import KeywordInput from "./keyword-input";
import MultiRangeSlider from "./multi-range-slider";
import PropertyTypes from "./property-types";
import RoomsAndToilets from "./rooms-and-toilets";

export default function SearchForm() {
  // eslint-disable-next-line react-compiler/react-compiler
  "use no memo";

  const t = useTranslations("units");

  const { data: minMaxPrice } = useSuspenseQuery(minMaxPriceQuery);

  const [searchParams, setSearchParams] = useQueryStates(
    {
      keyword: parseAsString.withDefault(""),
      governoment_id: parseAsString.withDefault(""),
      city_id: parseAsString.withDefault(""),
      price_from: parseAsInteger.withDefault(minMaxPrice.min_price),
      price_to: parseAsInteger.withDefault(minMaxPrice.max_price),
      finish_type: parseAsString.withDefault(""),
      property_type: parseAsArrayOf(parseAsString).withDefault([]),
      bathroom_numbers: parseAsString.withDefault(""),
      room_numers: parseAsString.withDefault(""),
    },
    {
      history: "replace",
    },
  );

  const updateSearchParams = useDebouncedCallback(
    (value: Record<string, any>) => {
      setSearchParams(value);
    },
    100,
  );

  const form = useForm<FormValues>({
    defaultValues: {
      keyword: searchParams.keyword,
      governoment_id: searchParams.governoment_id,
      city_id: searchParams.city_id,
      price_from: searchParams.price_from,
      price_to: minMaxPrice.max_price,
      finish_type: searchParams.finish_type,
      property_type: searchParams.property_type,
      bathroom_numbers: searchParams.bathroom_numbers,
      room_numers: searchParams.room_numers,
    },
  });

  const currentValues = form.watch();

  useEffect(() => {
    const newSearchParams: Record<string, any> = {};
    let changed = false;
    for (const [key, value] of Object.entries(currentValues)) {
      const searchParamValue = searchParams[key as keyof typeof searchParams];

      if (Array.isArray(value)) {
        if (JSON.stringify(value) !== JSON.stringify(searchParamValue)) {
          newSearchParams[key] = value;
          changed = true;
        }
      } else if ((value == null || value === "") && searchParamValue) {
        newSearchParams[key] = value;
        changed = true;
      } else if (value !== "" && searchParamValue !== value) {
        newSearchParams[key] = value;
        changed = true;
      }
    }

    if (changed) {
      updateSearchParams(newSearchParams);
    }
  }, [currentValues, searchParams, updateSearchParams]);

  const clearSearchParams = () => {
    form.reset({
      keyword: "",
      governoment_id: "",
      city_id: "",
      price_from: minMaxPrice.min_price,
      price_to: minMaxPrice.max_price,
      finish_type: "",
      property_type: [],
      bathroom_numbers: "",
      room_numers: "",
    });
  };

  return (
    <div className="flex flex-col p-6 pt-24 lg:max-w-6xl lg:border-e lg:border-e-slate-200">
      <div className="border-b border-b-slate-900">
        <h3 className="mb-3 font-medium text-slate-700">{t("filter")}</h3>
      </div>
      <Form {...form}>
        <form className="flex flex-col gap-10">
          <KeywordInput />
          <CitiesAndRegions />
          <RoomsAndToilets />
          <FinishingTypes />
          <PropertyTypes />
          <MultiRangeSlider
            min={minMaxPrice.min_price}
            max={minMaxPrice.max_price}
          />
          <Button
            onClick={clearSearchParams}
            variant="outline"
            size="lg"
            type="button"
          >
            {t("clear")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
