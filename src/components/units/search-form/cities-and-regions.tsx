import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { type Control } from "react-hook-form";
import Select, { type SingleValue } from "react-select";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { citiesQuery, districtsQuery } from "@/queries/location";

import { type SelectOptionsTypes } from "../types";

type CitiesAndRegionsProps = {
  control: Control;
  onChange: (name: string, value: string, isSelected?: boolean) => void;
};

const CitiesAndRegions = ({ control, onChange }: CitiesAndRegionsProps) => {
  const searchParams = useSearchParams();
  const t = useTranslations("units");
  const [governorate, setGovernorate] = useState<string | number | null>(() =>
    searchParams.get("governoment_id"),
  );

  const { data: cities } = useSuspenseQuery(citiesQuery);
  const { data: districts } = useQuery(districtsQuery(governorate));

  const onChangeCity = (option: SingleValue<SelectOptionsTypes>) => {
    if (option?.value) {
      onChange("governoment_id", String(option.value));
      setGovernorate(option.value);
    }
  };

  const onChangeDistrict = (option: SingleValue<SelectOptionsTypes>) => {
    onChange("city_id", String(option?.value));
  };

  return (
    <>
      <div>
        <p className="mb-5 font-semibold text-[#777777]">{t("findPlace")}</p>
        <div className="filter-search-form relative mt-2">
          <FormField
            control={control}
            name="governoment_id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row items-center">
                    <Select
                      classNamePrefix="react-select"
                      placeholder={t("selectCity")}
                      isClearable
                      className="form-input filter-input-box border-0"
                      options={cities}
                      {...field}
                      value={cities.find((city) => {
                        return city.value === +field.value;
                      })}
                      onChange={(e) => {
                        onChangeCity(e);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div>
        <div className="filter-search-form relative mt-2">
          <FormField
            control={control}
            name="city_id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row items-center">
                    <Select
                      classNamePrefix="react-select"
                      placeholder={t("selectDistrict")}
                      isClearable
                      className="form-input filter-input-box"
                      options={districts}
                      {...field}
                      value={districts?.find((district) => {
                        return district.value === +field.value;
                      })}
                      onChange={(e) => {
                        onChangeDistrict(e);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default CitiesAndRegions;
