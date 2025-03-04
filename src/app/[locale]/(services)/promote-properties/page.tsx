import { type Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import { generateAlternatesLinks } from "@/lib/utils";

import LeadForm from "../lead-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("services");

  return {
    alternates: generateAlternatesLinks("/promote-properties"),
    title: t("promote-properties.title"),
    description: t("promote-properties.description"),
    openGraph: {
      title: t("promote-properties.title"),
      description: t("promote-properties.description"),
    },
  };
}

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
