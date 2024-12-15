import { useTranslations } from "next-intl";

import LeadForm from "../lead-form";

export default function PromoteProperties() {
  const t = useTranslations("services");

  return (
    <LeadForm
      serviceName="promote-properties"
      title={t("promote-properties.title")}
      description={t("promote-properties.description")}
    />
  );
}
