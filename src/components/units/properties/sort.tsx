"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/navigation";

const Sort = () => {
  const t = useTranslations("units");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const sortOptions = [
    { label: t("newest"), value: "newest" },
    { label: t("highToLow"), value: "high-to-low" },
    { label: t("lowToHigh"), value: "low-to-high" },
  ];

  const onChange = (value: string) => {
    const searchParamsObj = new URLSearchParams(searchParams.toString());
    if (value !== "" && searchParamsObj.get("sort_by") !== value.toString()) {
      searchParamsObj.set("sort_by", value.toString());
    }
    router.replace(pathname + "?" + searchParamsObj.toString(), {
      scroll: false,
    });
  };

  return (
    <div className="my-7">
      <Select onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={t("sort")} />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((sort) => (
            <SelectItem key={sort.value} value={sort.value.toString()}>
              {sort.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sort;
