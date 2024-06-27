import { type Unit as UnitType } from "@/services/types";

import Unit from "../../unit";
import Properties from "./properties";

type PropertiesPageProps = {
  properties: Array<UnitType>;
  totalProperties: number;
};

const PropertiesPage = ({
  properties,
  totalProperties,
}: PropertiesPageProps) => {
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
