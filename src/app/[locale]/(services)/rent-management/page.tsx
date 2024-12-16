import { useTranslations } from "next-intl";

import LeadForm from "../lead-form";

export default function RentManagement() {
  const t = useTranslations("services");

  return (
    <LeadForm
      serviceName="rent-management"
      title={t("rent-management.title")}
      description={t("rent-management.description")}
    />
  );
}
