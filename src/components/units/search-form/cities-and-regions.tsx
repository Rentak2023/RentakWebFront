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
import LoadingSpinner from "@/components/ui/loading-spinner";
import { getDistricts } from "@/services/properties";

import { type DistrictTypes, type SelectOptionsTypes } from "../types";

type CitiesAndRegionsProps = {
  control: Control;
  onChange: (name: string, value: string, isSelected?: boolean) => void;
  cities: Array<{
    label: string;
    value: number;
  }>;
};

const CitiesAndRegions = ({
  control,
  onChange,
  cities,
}: CitiesAndRegionsProps) => {
  const t = useTranslations("units");

  const [districts, setDistricts] = useState<Array<SelectOptionsTypes>>([]);

  const onChangeCity = async (option: SingleValue<SelectOptionsTypes>) => {
    if (option?.value) {
      onChange("governoment_id", String(option.value));

      await getDistrictsHandler(option.value);
    }
  };

  const getDistrictsHandler = async (government: string | number) => {
    const districts = await getDistricts(government);
    const formattedDistricts = districts.map((district: DistrictTypes) => ({
      label: district.city_name,
      value: district.city_id,
    }));
    setDistricts(formattedDistricts);
  };

  const onChangeDistrict = (option: SingleValue<SelectOptionsTypes>) => {
    onChange("city_id", String(option?.value));
  };

  if (cities.length === 0) return <LoadingSpinner />;

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
                      value={districts.find((district) => {
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
