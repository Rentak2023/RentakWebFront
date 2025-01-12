import { useTranslations } from "next-intl";

import LeadForm from "../lead-form";

export default function RequestProperty() {
  const t = useTranslations("services");

  return (
    <LeadForm
      serviceName="request-property"
      title={t("request-property.title")}
      description={t("request-property.description")}
    />
  );
}
