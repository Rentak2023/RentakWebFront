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
import { propertyTypesQuery } from "@/queries/units";

const PropertyTypes = () => {
  const t = useTranslations("units");
  const locale = useLocale();
  const form = useFormContext();

  const { data: propertyTypes } = useSuspenseQuery(propertyTypesQuery(locale));

  return (
    <div>
      <p className="mb-5 font-semibold text-[#777777]">{t("propertyType")}</p>
      <div className="flex flex-row flex-wrap gap-[20px]">
        <FormField
          control={form.control}
          name="property_type"
          render={() => (
            <FormItem>
              {propertyTypes.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id.toString())}
                            onCheckedChange={(checked) => {
                              const value = field.value || [];
                              checked
                                ? field.onChange([...value, item.id.toString()])
                                : field.onChange(
                                    value?.filter(
                                      (value: string) =>
                                        value !== item.id.toString(),
                                    ),
                                  );
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
};

export default PropertyTypes;
