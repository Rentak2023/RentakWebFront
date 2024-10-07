"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
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
  const searchParams = useSearchParams();
  const t = useTranslations("units");

  const { data: minMaxPrice } = useSuspenseQuery(minMaxPriceQuery);

  const updateSearchParams = useDebouncedCallback((value: URLSearchParams) => {
    globalThis.history.replaceState(null, "", `?${value.toString()}`);
  }, 100);

  const form = useForm<FormValues>({
    defaultValues: {
      keyword: searchParams.get("keyword") ?? "",
      governoment_id: searchParams.get("governoment_id") ?? "",
      city_id: searchParams.get("city_id") ?? "",
      price_from: searchParams.get("price_from")
        ? Number(searchParams.get("price_from"))
        : minMaxPrice.min_price,
      price_to: searchParams.get("price_to")
        ? Number(searchParams.get("price_to"))
        : minMaxPrice.max_price,
      finish_type: searchParams.get("finish_type") ?? "",
      property_type: searchParams.getAll("property_type"),
      bathroom_numbers: searchParams.get("bathroom_numbers") ?? "",
      room_numers: searchParams.get("room_numers") ?? "",
    },
  });

  const currentValues = form.watch();

  useEffect(() => {
    const searchParamsObj = new URLSearchParams(searchParams.toString());

    let changed = false;
    for (const [key, value] of Object.entries(currentValues)) {
      if (Array.isArray(value)) {
        for (const item of value) {
          if (!searchParamsObj.getAll(key).includes(item.toString())) {
            searchParamsObj.append(key, item.toString());
            changed = true;
          }
        }

        for (const item of searchParamsObj.getAll(key)) {
          if (!value.includes(item)) {
            searchParamsObj.delete(key, item);
            changed = true;
          }
        }
      } else if (value == null || (value === "" && searchParamsObj.has(key))) {
        searchParamsObj.delete(key);
        changed = true;
      } else if (
        value !== "" &&
        searchParamsObj.get(key) !== value.toString()
      ) {
        searchParamsObj.set(key, value.toString());
        changed = true;
      }
    }
    if (changed) {
      updateSearchParams(searchParamsObj);
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
          <Button onClick={clearSearchParams} variant="outline" size="lg">
            {t("clear")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
