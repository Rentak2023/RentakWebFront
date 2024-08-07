import Image from "next/image";

import forsaLogo from "@/app/[locale]/assets/images/logos/forsa.jpg";
import halanLogo from "@/app/[locale]/assets/images/logos/halan.png";
import orionLogo from "@/app/[locale]/assets/images/logos/orion.png";
import palmHillsLogo from "@/app/[locale]/assets/images/logos/palm-hills.png";
import paytabsLogo from "@/app/[locale]/assets/images/logos/paytabs.jpg";
import souhoolaLogo from "@/app/[locale]/assets/images/logos/souhoola.png";

const partners = [
  {
    name: "Forsa",
    logo: forsaLogo,
  },
  {
    name: "orion",
    logo: orionLogo,
  },
  {
    name: "Paytabs",
    logo: paytabsLogo,
  },
  {
    name: "souhoola",
    logo: souhoolaLogo,
  },
  {
    name: "halan",
    logo: halanLogo,
  },
  {
    name: "palm hills",
    logo: palmHillsLogo,
  },
];

export function Partners() {
  return (
    <div className="container mx-auto mt-24 px-6 sm:mt-32 md:px-8">
      <h3 className="text-center text-xl font-medium text-slate-700">
        Trusted by
      </h3>
      <div className="mt-8 grid items-center justify-items-center gap-8 lg:grid-cols-6">
        {partners.map((partner) => (
          <Image
            key={partner.name}
            src={partner.logo}
            alt={partner.name}
            // width={200}
            height={60}
            className="block object-contain"
          />
        ))}
      </div>
    </div>
  );
}
