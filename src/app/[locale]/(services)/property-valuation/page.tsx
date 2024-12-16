import { useTranslations } from "next-intl";

import LeadForm from "../lead-form";

export default function PropertyValuation() {
  const t = useTranslations("services");

  return (
    <LeadForm
      serviceName="property-valuation"
      title={t("property-valuation.title")}
      description={t("property-valuation.description")}
    />
  );
}
