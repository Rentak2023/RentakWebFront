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
    alternates: generateAlternatesLinks("/rentak-basic", locale),
    title: "Rentak Basic",
    openGraph: {
      title: "Rentak Basic",
    },
  };
}

export default function RentakBasic() {
  return <LeadForm serviceName="rentak-basic" title="Rentak Basic" />;
}
