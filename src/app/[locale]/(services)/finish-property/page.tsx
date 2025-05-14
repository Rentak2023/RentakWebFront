import { type Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import LeadForm from "@/app/[locale]/(services)/lead-form";
import { generateAlternatesLinks } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("services");

  return {
    alternates: generateAlternatesLinks("/finish-property"),
    title: t("finish-property.title"),
    description: t("finish-property.description"),
    openGraph: {
      title: t("finish-property.title"),
      description: t("finish-property.description"),
    },
  };
}

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
