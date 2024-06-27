"use client";
import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { type Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { type FormValues } from "../types";

const KeywordInput = ({
  control,
  onChange,
}: {
  control: Control<FormValues>;
  onChange: (name: string, value: string) => void;
}) => {
  const t = useTranslations("units");

  return (
    <div className="relative mt-2">
      <FormField
        control={control}
        name="keyword"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex flex-row items-center">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <SearchIcon
                    className="size-5 text-slate-400"
                    aria-hidden="true"
                  />
                </div>

                <Input
                  {...field}
                  type="search"
                  className="form-input border-0 bg-gray-50 ps-10"
                  placeholder={t("searchKeyword")}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(e);
                    onChange("keyword", e.currentTarget.value);
                  }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default KeywordInput;
