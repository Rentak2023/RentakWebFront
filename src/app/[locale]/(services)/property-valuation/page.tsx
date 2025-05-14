import { type Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import LeadForm from "@/app/[locale]/(services)/lead-form";
import { generateAlternatesLinks } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("services");

  return {
    alternates: generateAlternatesLinks("/property-valuation"),
    title: t("property-valuation.title"),
    description: t("property-valuation.description"),
    openGraph: {
      title: t("property-valuation.title"),
      description: t("property-valuation.description"),
    },
  };
}

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
