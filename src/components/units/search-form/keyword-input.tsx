"use client";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { type Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { type FormValues } from "../types";

const KeywordInput = ({
  control,
  onChange,
}: {
  control: Control<FormValues>;
  onChange: (name: string, value: string) => void;
}) => {
  const t = useTranslations("units");
  const searchParams = useSearchParams();

  return (
    <div>
      <div className="filter-search-form relative mt-2">
        <FormField
          control={control}
          name="keyword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-row items-center">
                  <Search className="icons !text-[#41454D]" width={18} />
                  <input
                    type="text"
                    id="keyword"
                    className="form-input filter-input-box border-0 bg-gray-50"
                    placeholder={t("searchKeyword")}
                    {...field}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      field.onChange(e);
                      onChange("keyword", e.currentTarget.value);
                    }}
                    defaultValue={searchParams.get("keyword")?.toString()}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default KeywordInput;
