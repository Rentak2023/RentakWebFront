import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type FormValues } from "@/components/units/types";
import { orpc } from "@/lib/orpc";

function FinishingTypes() {
  const t = useTranslations("units");
  const locale = useLocale();
  const form = useFormContext<FormValues>();

  const { data: finishingTypes } = useSuspenseQuery(
    orpc.units.finishings.queryOptions({
      input: locale,
    }),
  );

  const selectedFinishType = form.watch("finish_type");

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-medium text-slate-600">{t("finishingTypes")}</p>
        {selectedFinishType ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs text-slate-500 hover:text-slate-900"
            onClick={() => {
              form.setValue("finish_type", null, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });
            }}
          >
            {t("clear")}
          </Button>
        ) : null}
      </div>
      <FormField
        control={form.control}
        name="finish_type"
        render={({ field }) => (
          <FormItem className="mt-4 space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={(val) => {
                  field.onChange(val ? Number(val) : null);
                }}
                value={field.value ? String(field.value) : ""}
                className="flex flex-col space-y-4"
              >
                {finishingTypes.map((type) => (
                  <FormItem
                    key={type.id}
                    className="flex items-center gap-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={type.id.toString()} />
                    </FormControl>
                    <FormLabel className="cursor-pointer font-normal">
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
