import { type Metadata } from "next";

import { generateAlternatesLinks } from "@/lib/utils";

import LeadForm from "../lead-form";

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
