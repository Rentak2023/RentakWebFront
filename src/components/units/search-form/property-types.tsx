import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type FormValues } from "@/components/units/types";
import { orpc } from "@/lib/orpc";

function PropertyTypes() {
  const t = useTranslations("units");
  const locale = useLocale();
  const form = useFormContext<FormValues>();

  const { data: propertyTypes } = useSuspenseQuery(
    orpc.units.propertyTypes.queryOptions({
      input: locale,
    }),
  );

  return (
    <div>
      <p className="font-medium text-slate-600">{t("propertyType")}</p>
      <div className="mt-4 flex flex-col gap-4">
        <FormField
          control={form.control}
          name="property_type"
          render={({ field }) => {
            const selectedValues: Array<number> = Array.isArray(field.value)
              ? field.value.map(Number).filter((n) => !Number.isNaN(n))
              : [];

            return (
              <FormItem className="space-y-4">
                {propertyTypes.map((item) => {
                  const isChecked = selectedValues.includes(item.id);
                  return (
                    <FormItem
                      key={item.id}
                      className="flex items-center gap-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...selectedValues, item.id]);
                            } else {
                              field.onChange(
                                selectedValues.filter((id) => id !== item.id),
                              );
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="cursor-pointer font-normal">
                        {item.type_name}
                      </FormLabel>
                    </FormItem>
                  );
                })}
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>
    </div>
  );
}

export default PropertyTypes;
