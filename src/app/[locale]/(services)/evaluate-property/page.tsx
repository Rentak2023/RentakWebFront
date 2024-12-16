import { useTranslations } from "next-intl";

import LeadForm from "../lead-form";

export default function EvaluateProperty() {
  const t = useTranslations("services");

  return (
    <LeadForm
      serviceName="evaluate-property"
      title={t("evalute-property.title")}
      description={t("evalute-property.description")}
    />
  );
}
