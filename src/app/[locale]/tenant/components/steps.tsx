import { useTranslations } from "next-intl";

import Steps, { type Step } from "@/components/landing/steps";

export default function TenantSteps() {
  const t = useTranslations("tenant.steps");
  const steps: Array<Step> = [
    {
      title: t("listing.title"),
      color: "#CEEBBB",
      description: t("listing.description"),
    },
    {
      title: t("viewing.title"),
      color: "#D8BBEB",
      description: t("viewing.description"),
    },
    {
      title: t("payment.title"),
      color: "#EBC0BB",
      description: t("payment.description"),
    },
    {
      title: t("stay.title"),
      color: "#D2A78C",
      description: t("stay.description"),
    },
  ];
  return <Steps title={t("title")} steps={steps} />;
}
