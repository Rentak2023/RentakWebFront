import { getTranslations } from "next-intl/server";

import Unit from "@/components/unit";
import { type Unit as UnitType } from "@/services/types";

import Pagination from "../pagination";
import PropertiesHeader from "./properties-header";

type PropertiesProps = {
  properties: Array<UnitType>;
  totalProperties: number;
  totalPages: number;
};

const Properties = async ({
  properties,
  totalProperties,
  totalPages,
}: PropertiesProps) => {
  const t = await getTranslations("units");

  return (
    <div className="container mx-auto mt-16 px-8 lg:mt-24">
      <PropertiesHeader />
      <div className="my-7 text-lg font-medium">
        <span className="text-primary-600">{totalProperties}</span>{" "}
        {t("propertiesFound")}
      </div>
      <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-2 xl:grid-cols-3">
        {properties.length === 0 ? (
          <div className="flex h-96 items-center justify-center">
            <p className="text-lg text-gray-600">{t("noProperties")}</p>
          </div>
        ) : (
          properties.map((item) => <Unit key={item.id} item={item} />)
        )}
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default Properties;
