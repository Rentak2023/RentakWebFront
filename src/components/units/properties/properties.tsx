"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { useQueryStates } from "nuqs";
import { Suspense } from "react";

import UnitsSkeleton from "@/components/home/units/units-skeleton";
import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import Unit from "@/components/unit";
import { unitsQuery } from "@/queries/units";
import { propertiesQueryParsers } from "@/services/properties";

import Pagination from "../pagination";
import PropertiesHeader from "./properties-header";
import Sort from "./sort";

function Properties() {
  return (
    <Container className="mt-4 md:mt-16 lg:mt-24">
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
    </Container>
  );
}

function UnitsCount() {
  const t = useTranslations("units");
  const locale = useLocale();
  const [searchParams] = useQueryStates(propertiesQueryParsers);

  const { data: properties } = useSuspenseQuery(
    unitsQuery({
      ...searchParams,
      lang: locale,
    }),
  );

  return (
    <div className="my-7 text-sm font-medium md:text-base">
      {t.rich("propertiesFound", {
        count: properties.total_count,
        colored: (text) => (
          <span className="text-primary-600 text-lg">{text}</span>
        ),
      })}
    </div>
  );
}

function Units() {
  const t = useTranslations("units");
  const [searchParams] = useQueryStates(propertiesQueryParsers);
  const locale = useLocale();
  const { data: properties } = useSuspenseQuery(
    unitsQuery({
      ...searchParams,
      lang: locale,
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
      <Pagination totalPages={Math.ceil(properties.total_count / 10)} />
    </>
  );
}

export default Properties;
