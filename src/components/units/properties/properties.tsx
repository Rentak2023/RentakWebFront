"use client";
import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { useQueryStates } from "nuqs";
import { Suspense } from "react";

import UnitsSkeleton from "@/components/home/units/units-skeleton";
import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "@/components/units/pagination";
import SodicBanner from "@/components/units/sodic-banner";
import Unit from "@/components/units/unit";
import { orpc } from "@/lib/orpc";
import { propertiesQueryParsers } from "@/services/properties";

import PropertiesHeader from "./properties-header";
import ResetFilters from "./reset-filters";
import Sort from "./sort";

type UnitsListOptions = NonNullable<
  Parameters<typeof orpc.units.list.queryOptions>[0]
>;
type UnitsListInput = UnitsListOptions["input"];

function buildUnitsInput(
  searchParams: Record<string, unknown>,
  locale: string,
): UnitsListInput {
  const cleaned = Object.fromEntries(
    Object.entries(searchParams).filter(
      ([, value]) => value !== null && value !== undefined && value !== "",
    ),
  );
  return { ...cleaned, lang: locale } as UnitsListInput;
}

function useUnitsQuery() {
  const [searchParams] = useQueryStates(propertiesQueryParsers);
  const locale = useLocale();

  return useSuspenseQuery(
    orpc.units.list.queryOptions({
      input: buildUnitsInput(searchParams, locale),
    }),
  );
}

function Properties() {
  return (
    <Container className="mt-4 space-y-6 md:mt-16 lg:mt-24">
      <SodicBanner />
      <PropertiesHeader />
      <div className="flex items-center justify-between">
        <Suspense
          fallback={
            <div className="my-7">
              <Skeleton className="h-5 w-32" />
            </div>
          }
        >
          <UnitsCount />
          <div className="my-7 flex items-center gap-2">
            <ResetFilters />
            <Sort />
          </div>
        </Suspense>
      </div>
      <Suspense fallback={<UnitsSkeleton />}>
        <Units />
      </Suspense>
    </Container>
  );
}

function UnitsCount() {
  const t = useTranslations("units");
  const { data: properties } = useUnitsQuery();

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
  const { data: properties } = useUnitsQuery();

  const blurHashQueries = useSuspenseQueries({
    queries: properties.items.map((item) =>
      orpc.placeholder.blurhash.queryOptions({
        input: { url: item.picture || undefined },
      }),
    ),
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {properties.items.length === 0 ? (
          <div className="flex h-96 items-center justify-center">
            <p className="text-lg text-slate-600">{t("noProperties")}</p>
          </div>
        ) : (
          properties.items.map((item, index) => (
            <Unit
              key={item.id}
              item={item}
              blurhash={blurHashQueries.at(index)?.data}
            />
          ))
        )}
      </div>
      <Pagination totalPages={Math.ceil(properties.total_count / 10)} />
    </>
  );
}

export default Properties;
