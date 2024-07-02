import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";

import UnitsSkeleton from "@/components/home/units/units-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import Unit from "@/components/unit";
import { getProperties } from "@/services/properties";

import Pagination from "../pagination";
import PropertiesHeader from "./properties-header";
import Sort from "./sort";

type UnitsSearchParams = {
  governoment_id?: number;
  city_id?: number;
  finish_type?: number;
  bathroom_numbers?: number;
  room_numers?: number;
  property_type?: Array<number>;
  keyword?: string;
  price_to?: number;
  price_from?: number;
  page?: number;
};

type PropertiesProps = {
  searchParams: UnitsSearchParams;
};

const Properties = async ({ searchParams }: PropertiesProps) => {
  const locale = await getLocale();

  const propertiesPromise = getProperties({
    ...searchParams,
    lang: locale,
    page: searchParams.page ?? 1,
  });

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
          <UnitsCount propertiesPromise={propertiesPromise} />
        </Suspense>
        <Sort />
      </div>
      <Suspense fallback={<UnitsSkeleton />}>
        <Units propertiesPromise={propertiesPromise} />
      </Suspense>
    </div>
  );
};

async function UnitsCount({
  propertiesPromise,
}: {
  propertiesPromise: ReturnType<typeof getProperties>;
}) {
  const properties = await propertiesPromise;
  const t = await getTranslations("units");

  return (
    <div className="my-7 text-lg font-medium">
      <span className="text-primary-600">{properties.total_count}</span>{" "}
      <span className="text-sm md:text-base">{t("propertiesFound")}</span>
    </div>
  );
}

async function Units({
  propertiesPromise,
}: {
  propertiesPromise: ReturnType<typeof getProperties>;
}) {
  const t = await getTranslations("units");
  const properties = await propertiesPromise;

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
