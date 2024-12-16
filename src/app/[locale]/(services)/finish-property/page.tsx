import { useTranslations } from "next-intl";

import LeadForm from "../lead-form";

export default function FinishProperty() {
  const t = useTranslations("services");

  return (
    <LeadForm
      serviceName="property-finishing"
      title={t("finish-property.title")}
      description={t("finish-property.description")}
    />
  );
}
