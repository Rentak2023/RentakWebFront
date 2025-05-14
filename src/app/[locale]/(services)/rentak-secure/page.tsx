import { type Metadata } from "next";

import LeadForm from "@/app/[locale]/(services)/lead-form";
import { generateAlternatesLinks } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return {
    alternates: generateAlternatesLinks("/rentak-secure"),
    title: "Rentak Secure",
    openGraph: {
      title: "Rentak Secure",
    },
  };
}
export default function RentakSecure() {
  return <LeadForm serviceName="rentak-secure" title="Rentak Secure" />;
}
