import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { type Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { getPropertyTypes } from "@/services/properties";

import { type UnitTypeTypes } from "../types";

const PropertyTypes = ({
  control,
  onChange,
}: {
  control: Control;
  onChange: (name: string, value: string, isSelected: boolean) => void;
}) => {
  const t = useTranslations("units");
  const locale = useLocale();
  const searchParams = useSearchParams();

  const [propertyTypes, setPropertyTypes] = useState<Array<UnitTypeTypes>>([]);
  const [selectedTypes, setSelectedTypes] = useState<Array<string>>(() => {
    const initialTypes = searchParams.getAll("property_type");
    return initialTypes.length > 0 ? initialTypes : [];
  });

  const getPropertyTypesHandler = async () => {
    try {
      const propertyTypes = await getPropertyTypes(locale);
      setPropertyTypes(propertyTypes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPropertyTypesHandler();
  }, []);

  const handleCheckboxChange = (typeId: string, isChecked: boolean) => {
    let updatedSelectedTypes = [...selectedTypes];
    if (isChecked) {
      updatedSelectedTypes.push(typeId);
    } else {
      updatedSelectedTypes = updatedSelectedTypes.filter((id) => id !== typeId);
    }
    setSelectedTypes(updatedSelectedTypes);
    onChange("property_type", typeId, isChecked);
  };

  return (
    <div>
      <p className="mb-5 font-semibold text-[#777777]">{t("finishingTypes")}</p>
      <div className="flex flex-row flex-wrap gap-[20px]">
        {propertyTypes.map((type, index) => (
          <div key={`property-type-${type.id}`} className="relative sm:flex">
            <FormField
              control={control}
              name="property_type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center">
                      <input
                        id={type.type_name}
                        type="checkbox"
                        className="size-4 rounded text-[#C4C7CD]"
                        {...field}
                        checked={selectedTypes.includes(String(type.id))}
                        onChange={(e) => {
                          handleCheckboxChange(
                            e.target.value,
                            e.target.checked,
                          );
                        }}
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

export default PropertyTypes;
