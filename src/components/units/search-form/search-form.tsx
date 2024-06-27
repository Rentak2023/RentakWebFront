"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { usePathname, useRouter } from "@/navigation";
import { getMinMaxPrice } from "@/services/properties";
import URLS from "@/shared/urls";

import { type FormValues } from "../types";
import CitiesAndRegions from "./cities-and-regions";
import FinishingTypes from "./finishing-types";
import KeywordInput from "./keyword-input";
import MultiRangeSlider from "./multi-range-slider";
import PropertyTypes from "./property-types";
import RoomsAndToilets from "./rooms-and-toilets";

export default function SearchForm() {
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("units");

  const getMinMaxPriceHandler = async () => {
    try {
      const minMaxPrice = await getMinMaxPrice();
      setMinPrice(minMaxPrice.min_price);
      setMaxPrice(minMaxPrice.max_price);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMinMaxPriceHandler();
  }, []);

  const form = useForm<FormValues>({
    defaultValues: useMemo(
      () => ({
        keyword: searchParams.get("keyword") ?? "",
        governoment_id: searchParams.get("governoment_id") ?? "",
        city_id: searchParams.get("city_id") ?? "",
        price_from: minPrice ?? 0,
        price_to: maxPrice ?? 0,
        finish_type: searchParams.get("finish_type") ?? "",
        property_type: searchParams.getAll("property_type"),
        bathroom_numbers: searchParams.get("bathroom_numbers") ?? "",
        room_numers: searchParams.get("room_numers") ?? "",
      }),
      [searchParams, minPrice, maxPrice],
    ),
  });

  const handleSearch = useCallback(
    (name: string, value: string | undefined, isSelected = true) => {
      const searchParamsObj = new URLSearchParams(searchParams.toString());

      if (value === undefined) {
        searchParamsObj.delete(name);
        return;
      }

      if (isSelected) {
        if (name === "property_type") {
          searchParamsObj.append(name, value);
        } else {
          searchParamsObj.set(name, value);
        }
      } else {
        searchParamsObj.delete(name, value);
      }

      // router.push(`${pathname}?${searchParamsObj.toString()}`);
      history.replaceState(
        null,
        "",
        `${pathname}?${searchParamsObj.toString()}`,
      );
    },
    [pathname, searchParams],
  );

  const clearSearchParams = () => {
    router.replace(URLS.units);
    form.reset({
      keyword: "",
      governoment_id: "",
      city_id: "",
      price_from: minPrice ?? 0,
      price_to: maxPrice ?? 0,
      finish_type: "",
      property_type: [],
      bathroom_numbers: "",
      room_numers: "",
    });
  };

  if (minPrice === null || maxPrice === null) {
    return (
      <div className="border-e border-e-[#E5E7EB] md:col-span-6 lg:col-span-4">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="border-e border-e-[#E5E7EB] md:col-span-6 lg:col-span-4">
      <div className="top-20 bg-white p-6">
        <div className="border-b border-b-[#011435]">
          <p className="mb-3 font-medium text-[#41454D]">{t("filter")}</p>
        </div>
        <Form {...form}>
          <form>
            <div className="mb-5 grid grid-cols-1 gap-3">
              <KeywordInput control={form.control} onChange={handleSearch} />
              <CitiesAndRegions
                control={form.control}
                onChange={handleSearch}
              />
              <RoomsAndToilets control={form.control} onChange={handleSearch} />
            </div>
            <div className="mb-5 grid grid-cols-1 gap-3">
              <FinishingTypes control={form.control} onChange={handleSearch} />
            </div>
            <div className="mb-5 grid grid-cols-1 gap-3">
              <PropertyTypes control={form.control} onChange={handleSearch} />
            </div>
            <div className="mb-5 grid grid-cols-1 gap-3">
              <MultiRangeSlider
                min={minPrice}
                max={maxPrice}
                onChange={handleSearch}
                control={form.control}
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
