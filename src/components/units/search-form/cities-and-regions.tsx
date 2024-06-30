import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { citiesQuery, districtsQuery } from "@/queries/location";

const CitiesAndRegions = () => {
  const t = useTranslations("units");

  const form = useFormContext();

  const governorate = form.watch("governoment_id");

  const { data: cities } = useSuspenseQuery(citiesQuery);
  const { data: districts } = useQuery(districtsQuery(governorate));

  return (
    <div>
      <p className="font-medium text-slate-600">{t("findPlace")}</p>
      <div className="mt-4">
        <FormField
          control={form.control}
          name="governoment_id"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectCity")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.value} value={city.value.toString()}>
                      {city.label}
                    </SelectItem>
                  ))}
                  <Button
                    className="w-full px-2"
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      field.onChange(null);
                    }}
                  >
                    {t("clear")}
                  </Button>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="mt-2">
        <FormField
          control={form.control}
          name="city_id"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger disabled={!governorate}>
                    <SelectValue placeholder={t("selectDistrict")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {districts?.map((district) => (
                    <SelectItem
                      key={district.value}
                      value={district.value.toString()}
                    >
                      {district.label}
                    </SelectItem>
                  ))}
                  <Button
                    className="w-full px-2"
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      field.onChange(null);
                    }}
                  >
                    {t("clear")}
                  </Button>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default CitiesAndRegions;
