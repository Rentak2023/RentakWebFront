import { type Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import { generateAlternatesLinks } from "@/lib/utils";

import LeadForm from "../lead-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("services");

  return {
    alternates: generateAlternatesLinks("/evaluate-property"),
    title: t("evaluate-property.title"),
    description: t("evaluate-property.description"),
    openGraph: {
      title: t("evaluate-property.title"),
      description: t("evaluate-property.description"),
    },
  };
}

export default function EvaluateProperty() {
  const t = useTranslations("services");

  return (
    <LeadForm
      serviceName="evaluate-property"
      title={t("evaluate-property.title")}
      description={t("evaluate-property.description")}
    />
  );
}
