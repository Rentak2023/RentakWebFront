import { type Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import { generateAlternatesLinks } from "@/lib/utils";

import LeadForm from "../lead-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("services");

  return {
    alternates: generateAlternatesLinks("/rent-management"),
    title: t("rent-management.title"),
    description: t("rent-management.description"),
    openGraph: {
      title: t("rent-management.title"),
      description: t("rent-management.description"),
    },
  };
}

export default function RentManagement() {
  const t = useTranslations("services");

  return (
    <LeadForm
      serviceName="rent-management"
      title={t("rent-management.title")}
      description={t("rent-management.description")}
    />
  );
}
