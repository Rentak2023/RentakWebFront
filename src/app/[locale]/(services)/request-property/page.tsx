import { type Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import LeadForm from "@/app/[locale]/(services)/lead-form";
import { generateAlternatesLinks } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("services");

  return {
    alternates: generateAlternatesLinks("/request-property"),
    title: t("request-property.title"),
    description: t("request-property.description"),
    openGraph: {
      title: t("request-property.title"),
      description: t("request-property.description"),
    },
  };
}

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
