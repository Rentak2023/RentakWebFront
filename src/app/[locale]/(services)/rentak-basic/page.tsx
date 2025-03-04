import { type Metadata } from "next";

import { generateAlternatesLinks } from "@/lib/utils";

import LeadForm from "../lead-form";

export function generateMetadata(): Metadata {
  return {
    alternates: generateAlternatesLinks("/rentak-basic"),
    title: "Rentak Basic",
    openGraph: {
      title: "Rentak Basic",
    },
  };
}

export default function RentakBasic() {
  return <LeadForm serviceName="rentak-basic" title="Rentak Basic" />;
}
