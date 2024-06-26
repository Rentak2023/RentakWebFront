import { headers } from "next/headers";

import { getProperties } from "@/services/properties";
import { type Unit as UnitType } from "@/services/types";

import Unit from "../../unit";
import Properties from "./properties";

type PropertiesPageProps = {
  searchParams: string;
  locale: string;
};

const PropertiesPage = async ({
  searchParams,
  locale,
}: PropertiesPageProps) => {
  const response = await fetchProperties(searchParams, locale);
  const totalProperties = response.total_count;
  const properties: Array<UnitType> = response.items;
  const totalPages = Math.floor(totalProperties / 10);

  const renderUnit = (item: UnitType) => {
    return <Unit key={item.id} item={item} />;
  };

  return (
    <Properties
      properties={properties}
      totalProperties={totalProperties}
      totalPages={totalPages}
      renderUnit={renderUnit}
    />
  );
};

export default PropertiesPage;

async function fetchProperties(searchParams: string, locale: string) {
  const params = new URLSearchParams(searchParams);
  params.append("lang", locale);

  const response = await getProperties(params);
  return response;
}
