import { useTranslations } from "next-intl";

import Steps, { type Step } from "@/components/landing/steps";

export default function LandLordSteps() {
  const t = useTranslations("landlord.steps");
  const steps: Array<Step> = [
    {
      title: t("get-started.title"),
      color: "#CEEBBB",
      description: t("get-started.description"),
    },
    {
      title: t("inspection.title"),
      color: "#D8BBEB",
      description: t("inspection.description"),
    },
    {
      title: t("exposure.title"),
      color: "#EBC0BB",
      description: t("exposure.description"),
    },
    {
      title: t("find-tenant.title"),
      color: "#D2A78C",
      description: t("find-tenant.description"),
    },
    {
      title: t("contract.title"),
      color: "#DEA9AF",
      description: t("contract.description"),
    },
    {
      title: t("collection.title"),
      color: "#A78CD2",
      description: t("collection.description"),
    },
  ];
  return <Steps title={t("title")} steps={steps} />;
}
