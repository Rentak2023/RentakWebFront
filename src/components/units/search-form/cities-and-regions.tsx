import { skipToken, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
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
import { orpc } from "@/lib/orpc";

function CitiesAndRegions() {
  const t = useTranslations("units");

  const form = useFormContext();

  const governorate = form.watch("governoment_id");
  const locale = useLocale();

  const { data: governorates } = useSuspenseQuery(
    orpc.locations.governorates.queryOptions({
      input: locale,
    }),
  );
  const citiesOptions = orpc.locations.cities.queryOptions({
    input: {
      governorate_id: governorate,
      lang: locale,
    },
  });

  const { data: cities } = useQuery({
    ...citiesOptions,
    queryFn: governorate ? citiesOptions.queryFn : skipToken,
  });

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
                  {governorates.map((governorate) => (
                    <SelectItem
                      key={governorate.governorate_id}
                      value={governorate.governorate_id.toString()}
                    >
                      {governorate.governorate_name}
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
                  {cities?.map((district) => (
                    <SelectItem
                      key={district.city_id}
                      value={district.city_name.toString()}
                    >
                      {district.city_name}
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
}

export default CitiesAndRegions;
