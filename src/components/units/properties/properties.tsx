"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Suspense } from "react";

import UnitsSkeleton from "@/components/home/units/units-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import Unit from "@/components/unit";
import { unitsQuery } from "@/queries/units";

import Pagination from "../pagination";
import PropertiesHeader from "./properties-header";
import Sort from "./sort";

function Properties() {
  return (
    <div className="container mx-auto mt-4 px-8 md:mt-16 lg:mt-24">
      <PropertiesHeader />
      <div className="flex justify-between">
        <Suspense
          fallback={
            <div className="my-7">
              <Skeleton className="h-5 w-32" />
            </div>
          }
        >
          <UnitsCount />
        </Suspense>
        <Sort />
      </div>
      <Suspense fallback={<UnitsSkeleton />}>
        <Units />
      </Suspense>
    </div>
  );
}

function UnitsCount() {
  const t = useTranslations("units");
  const searchParams = useSearchParams();
  const locale = useLocale();
  const { data: properties } = useSuspenseQuery(
    unitsQuery({
      ...Object.fromEntries(searchParams.entries()),
      lang: locale,
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    }),
  );

  return (
    <div className="my-7 text-sm font-medium md:text-base">
      {t.rich("propertiesFound", {
        count: properties.total_count,
        colored: (text) => (
          <span className="text-lg text-primary-600">{text}</span>
        ),
      })}
    </div>
  );
}

function Units() {
  const t = useTranslations("units");
  const searchParams = useSearchParams();
  const locale = useLocale();
  const { data: properties } = useSuspenseQuery(
    unitsQuery({
      ...Object.fromEntries(searchParams.entries()),
      lang: locale,
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    }),
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {properties.items.length === 0 ? (
          <div className="flex h-96 items-center justify-center">
            <p className="text-lg text-slate-600">{t("noProperties")}</p>
          </div>
        ) : (
          properties.items.map((item) => <Unit key={item.id} item={item} />)
        )}
      </div>
      <Pagination totalPages={Math.floor(properties.total_count / 10)} />
    </>
  );
}

export default Properties;
