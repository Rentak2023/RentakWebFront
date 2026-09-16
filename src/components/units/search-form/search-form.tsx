"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useQueryStates } from "nuqs";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { type FormValues } from "@/components/units/types";
import { orpc } from "@/lib/orpc";
import { propertiesQueryParsers } from "@/services/properties";

import CitiesAndRegions from "./cities-and-regions";
import FinishingTypes from "./finishing-types";
import KeywordInput from "./keyword-input";
import PriceRangeFilter from "./price-range-filter";
import PropertyTypes from "./property-types";
import RoomsAndToilets from "./rooms-and-toilets";

export default function SearchForm() {
  const t = useTranslations("units");

  const { data: priceRange } = useSuspenseQuery(
    orpc.units.priceRange.queryOptions(),
  );

  const [searchParams, setSearchParams] = useQueryStates(
    propertiesQueryParsers,
    {
      history: "replace",
    },
  );

  const isUpdatingFromUrlRef = useRef(false);

  const form = useForm<FormValues>({
    defaultValues: {
      keyword: searchParams.keyword ?? "",
      governoment_id: searchParams.governoment_id ?? null,
      city_id: searchParams.city_id ?? null,
      price_from: searchParams.price_from ?? priceRange.min_price,
      price_to: searchParams.price_to ?? priceRange.max_price,
      finish_type: searchParams.finish_type ?? null,
      property_type: searchParams.property_type ?? [],
      bathroom_numbers: searchParams.bathroom_numbers ?? null,
      room_numers: searchParams.room_numers ?? null,
    },
  });

  const updateUrl = useDebouncedCallback((values: FormValues) => {
    if (isUpdatingFromUrlRef.current) return;

    void setSearchParams({
      keyword: values.keyword ?? null,
      governoment_id: values.governoment_id ?? null,
      city_id: values.city_id ?? null,
      finish_type: values.finish_type ?? null,
      property_type:
        values.property_type && values.property_type.length > 0
          ? values.property_type
          : null,
      bathroom_numbers: values.bathroom_numbers ?? null,
      room_numers: values.room_numers ?? null,
      page: 1,
    });
  }, 300);

  useEffect(() => {
    isUpdatingFromUrlRef.current = true;
    form.reset({
      keyword: searchParams.keyword ?? "",
      governoment_id: searchParams.governoment_id ?? null,
      city_id: searchParams.city_id ?? null,
      price_from: searchParams.price_from ?? priceRange.min_price,
      price_to: searchParams.price_to ?? priceRange.max_price,
      finish_type: searchParams.finish_type ?? null,
      property_type: searchParams.property_type ?? [],
      bathroom_numbers: searchParams.bathroom_numbers ?? null,
      room_numers: searchParams.room_numers ?? null,
    });

    const timer = setTimeout(() => {
      isUpdatingFromUrlRef.current = false;
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [
    searchParams.keyword,
    searchParams.governoment_id,
    searchParams.city_id,
    searchParams.price_from,
    searchParams.price_to,
    searchParams.finish_type,
    searchParams.property_type,
    searchParams.bathroom_numbers,
    searchParams.room_numers,
    form,
    priceRange.min_price,
    priceRange.max_price,
  ]);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (isUpdatingFromUrlRef.current) return;
      if (name && name !== "price_from" && name !== "price_to") {
        updateUrl(value as FormValues);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [form, updateUrl]);

  const clearSearchParams = () => {
    form.reset({
      keyword: "",
      governoment_id: null,
      city_id: null,
      price_from: priceRange.min_price,
      price_to: priceRange.max_price,
      finish_type: null,
      property_type: [],
      bathroom_numbers: null,
      room_numers: null,
    });

    void setSearchParams({
      keyword: null,
      governoment_id: null,
      city_id: null,
      price_from: null,
      price_to: null,
      finish_type: null,
      property_type: null,
      bathroom_numbers: null,
      room_numers: null,
      page: null,
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
          <PriceRangeFilter
            min={priceRange.min_price}
            max={priceRange.max_price}
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
