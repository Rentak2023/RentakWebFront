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
import { orpc } from "@/lib/orpc";

function PropertyTypes() {
  const t = useTranslations("units");
  const locale = useLocale();
  const form = useFormContext();

  const { data: propertyTypes } = useSuspenseQuery(
    orpc.units.propertyTypes.queryOptions({
      input: locale,
    }),
  );

  return (
    <div>
      <p className="font-medium text-slate-600">{t("propertyType")}</p>
      <div className="mt-4 flex flex-row gap-4">
        <FormField
          control={form.control}
          name="property_type"
          render={() => (
            <FormItem>
              {propertyTypes.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="property_type"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex items-center gap-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id.toString())}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([
                                  ...field.value,
                                  item.id.toString(),
                                ]);
                              } else {
                                field.onChange(
                                  field.value?.filter(
                                    (value: string) =>
                                      value !== item.id.toString(),
                                  ),
                                );
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.type_name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default PropertyTypes;
