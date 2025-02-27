import { type Metadata } from "next";
import { type Locale } from "next-intl";

import { generateAlternatesLinks } from "@/lib/utils";

import LeadForm from "../lead-form";

export async function generateMetadata(
  props: Readonly<{
    params: Promise<{ locale: Locale }>;
  }>,
): Promise<Metadata> {
  const { locale } = await props.params;

  return {
    alternates: generateAlternatesLinks("/rentak-secure", locale),
    title: "Rentak Secure",
    openGraph: {
      title: "Rentak Secure",
    },
  };
}
export default function RentakSecure() {
  return <LeadForm serviceName="rentak-secure" title="Rentak Secure" />;
}
