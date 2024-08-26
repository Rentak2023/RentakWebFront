import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { finishTypesQuery } from "@/queries/units";

function FinishingTypes() {
  const t = useTranslations("units");
  const locale = useLocale();
  const form = useFormContext();

  const { data: finishingTypes } = useSuspenseQuery(finishTypesQuery(locale));

  return (
    <div>
      <p className="font-medium text-slate-600">{t("finishingTypes")}</p>
      <FormField
        control={form.control}
        name="finish_type"
        render={({ field }) => (
          <FormItem className="mt-4 space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-y-1"
              >
                {finishingTypes.map((type) => (
                  <FormItem
                    key={type.id}
                    className="flex items-center gap-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={type.id.toString()} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {type.type_name}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default FinishingTypes;
