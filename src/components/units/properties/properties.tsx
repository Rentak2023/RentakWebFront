import { getTranslations } from "next-intl/server";

import { type Unit as UnitType } from "@/services/types";

import Pagination from "../pagination";
import PropertiesHeader from "./properties-header";

type PropertiesProps = {
  properties: Array<UnitType>;
  totalProperties: number;
  totalPages: number;
  renderUnit: (item: UnitType) => React.ReactNode;
};

const Properties = async ({
  properties,
  totalProperties,
  totalPages,
  renderUnit,
}: PropertiesProps) => {
  const t = await getTranslations("units");

  return (
    <div className="md:col-span-6 lg:col-span-8">
      <PropertiesHeader />
      <div className="my-7 text-lg font-medium">
        <span className="text-primary-600">{totalProperties}</span>{" "}
        {t("propertiesFound")}
      </div>
      <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-2">
        {properties.length === 0 ? (
          <div className="flex h-96 items-center justify-center">
            <p className="text-lg text-gray-600">{t("noProperties")}</p>
          </div>
        ) : (
          properties.map((item) => <div key={item.id}>{renderUnit(item)}</div>)
        )}
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default Properties;
