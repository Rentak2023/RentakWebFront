import { getLocale, getTranslations } from "next-intl/server";
import { createSerializer } from "nuqs/server";
import { Suspense } from "react";

import UnitsSkeleton from "@/components/home/units/units-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import Unit from "@/components/unit";
import {
  getProperties,
  propertiesQueryCache,
  propertiesQueryParsers,
} from "@/services/properties";

import Pagination from "../pagination";
import PropertiesHeader from "./properties-header";
import Sort from "./sort";

const serialize = createSerializer(propertiesQueryParsers);

function Properties() {
  const key = serialize(propertiesQueryCache.all());
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
          key={key}
        >
          <UnitsCount />
        </Suspense>
        <Sort />
      </div>
      <Suspense fallback={<UnitsSkeleton />} key={key}>
        <Units />
      </Suspense>
    </div>
  );
}

async function UnitsCount() {
  const searchParams = propertiesQueryCache.all();

  const t = await getTranslations("units");
  const locale = await getLocale();
  const properties = await getProperties({ ...searchParams, lang: locale });

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

async function Units() {
  const searchParams = propertiesQueryCache.all();

  const t = await getTranslations("units");
  const locale = await getLocale();
  const properties = await getProperties({ ...searchParams, lang: locale });

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
