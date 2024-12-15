import { useTranslations } from "next-intl";

import LeadForm from "../lead-form";

export default function BrokerageCommission() {
  const t = useTranslations("services");

  return (
    <LeadForm
      serviceName="brokerage-commission"
      title={t("brokerage-commission.title")}
      description={t("brokerage-commission.description")}
    />
  );
}
