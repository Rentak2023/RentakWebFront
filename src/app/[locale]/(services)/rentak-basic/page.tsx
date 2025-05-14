import { type Metadata } from "next";

import LeadForm from "@/app/[locale]/(services)/lead-form";
import { generateAlternatesLinks } from "@/lib/utils";

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
