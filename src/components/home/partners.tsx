import Image from "next/image";
import { useTranslations } from "next-intl";

import forsaLogo from "@/app/[locale]/assets/images/logos/forsa.jpg";
import halanLogo from "@/app/[locale]/assets/images/logos/halan.png";
import mastercardLogo from "@/app/[locale]/assets/images/logos/mastercard.png";
import orionLogo from "@/app/[locale]/assets/images/logos/orion.png";
import palmHillsLogo from "@/app/[locale]/assets/images/logos/palm-hills.png";
import paytabsLogo from "@/app/[locale]/assets/images/logos/paytabs.jpg";
import souhoolaLogo from "@/app/[locale]/assets/images/logos/souhoola.png";
import valuLogo from "@/app/[locale]/assets/images/logos/valu.png";
import visaLogo from "@/app/[locale]/assets/images/logos/visa.png";

const partners = [
  {
    name: "orion",
    logo: orionLogo,
  },
  {
    name: "palm hills",
    logo: palmHillsLogo,
  },
  {
    name: "Paytabs",
    logo: paytabsLogo,
  },
  {
    name: "valu",
    logo: valuLogo,
  },
  {
    name: "halan",
    logo: halanLogo,
  },
  {
    name: "Forsa",
    logo: forsaLogo,
  },
  {
    name: "souhoola",
    logo: souhoolaLogo,
  },
  {
    name: "visa",
    logo: visaLogo,
  },
  {
    name: "mastercard",
    logo: mastercardLogo,
  },
];

export function Partners() {
  const t = useTranslations("home.partners");
  return (
    <div className="container mx-auto mt-24 px-6 sm:mt-32 md:px-8">
      <h3 className="text-center text-xl font-medium text-slate-700">
        {t("title")}
      </h3>
      <div className="mt-8 grid grid-cols-3 items-center justify-items-center gap-6 lg:grid-cols-9 lg:flex-row xl:gap-12">
        {partners.map((partner) => (
          <div key={partner.name} className="flex-1">
            <Image
              src={partner.logo}
              alt={partner.name}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
