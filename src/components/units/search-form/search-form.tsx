"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { usePathname, useRouter } from "@/navigation";
import { minMaxPriceQuery } from "@/queries/units";

import { type FormValues } from "../types";
import CitiesAndRegions from "./cities-and-regions";
import FinishingTypes from "./finishing-types";
import KeywordInput from "./keyword-input";
import MultiRangeSlider from "./multi-range-slider";
import PropertyTypes from "./property-types";
import RoomsAndToilets from "./rooms-and-toilets";

export default function SearchForm() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("units");

  const { data: minMaxPrice } = useSuspenseQuery(minMaxPriceQuery);

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
      router.replace(pathname + "?" + searchParamsObj.toString());
    }
  }, [currentValues, pathname, router, searchParams]);

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
    <div className="border-e border-e-[#E5E7EB] md:col-span-6 lg:col-span-4">
      <div className="top-20 bg-white p-6">
        <div className="border-b border-b-[#011435]">
          <p className="mb-3 font-medium text-[#41454D]">{t("filter")}</p>
        </div>
        <Form {...form}>
          <form>
            <div className="mb-5 grid grid-cols-1 gap-3">
              <KeywordInput />
              <CitiesAndRegions />
              <RoomsAndToilets />
            </div>
            <div className="mb-5 grid grid-cols-1 gap-3">
              <FinishingTypes />
            </div>
            <div className="mb-5 grid grid-cols-1 gap-3">
              <PropertyTypes />
            </div>
            <div className="mb-5 grid grid-cols-1 gap-3">
              <MultiRangeSlider
                min={minMaxPrice.min_price}
                max={minMaxPrice.max_price}
              />
            </div>
            <div className="mt-8 grid grid-cols-1 gap-3">
              <div className="lg:mt-6">
                <input
                  type="button"
                  id="search-buy"
                  name="search"
                  className="btn !h-12 cursor-pointer rounded border border-[#777777] bg-white text-[#777777] shadow drop-shadow-xl hover:border-primary-700 hover:text-primary-700"
                  value={t("clear")}
                  onClick={clearSearchParams}
                />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
