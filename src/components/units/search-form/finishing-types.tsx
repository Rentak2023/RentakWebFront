import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { getFinishingTypes } from "@/services/properties";

import { type UnitTypeTypes } from "../types";

const FinishingTypes = () => {
  const t = useTranslations("units");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const form = useFormContext();

  const [finishingTypeValue, setFinishingTypeValue] = useState<string | number>(
    searchParams.get("finish_type") ?? "",
  );
  const [finishingTypes, setFinishingTypes] = useState<Array<UnitTypeTypes>>(
    [],
  );

  const getFinishingTypesHandler = async () => {
    try {
      const finishingTypes = await getFinishingTypes(locale);
      setFinishingTypes(finishingTypes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFinishingTypesHandler();
  }, []);

  const handleRadioChange = (typeId: string) => {
    setFinishingTypeValue(typeId);
  };

  return (
    <div>
      <p className="mb-5 font-semibold text-[#777777]">{t("finishingTypes")}</p>
      <div className="flex flex-row flex-wrap gap-[20px]">
        {finishingTypes.map((type, index) => (
          <div key={`finish-type-${type.id}`} className="relative sm:flex">
            <FormField
              control={form.control}
              name="finish_type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-row items-center">
                      <input
                        id={type.type_name}
                        type="radio"
                        className="form-radio"
                        {...field}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleRadioChange(e.target.value);
                        }}
                        checked={finishingTypeValue === String(type.id)}
                        value={type.id}
                      />
                      <label
                        htmlFor={type.type_name}
                        className="ms-2 w-full text-sm font-medium text-[#C4C7CD]"
                      >
                        {type.type_name}
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinishingTypes;
