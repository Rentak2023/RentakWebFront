import Image from "next/image";

import forsaLogo from "@/app/[locale]/assets/images/logos/forsa.png";
import halanLogo from "@/app/[locale]/assets/images/logos/halan.png";
import mastercardLogo from "@/app/[locale]/assets/images/logos/mastercard.png";
import meezaLogo from "@/app/[locale]/assets/images/logos/Meeza.svg";
import paytabsLogo from "@/app/[locale]/assets/images/logos/paytabs.svg";
import souhoolaLogo from "@/app/[locale]/assets/images/logos/souhoola.png";
import valuLogo from "@/app/[locale]/assets/images/logos/valu.png";
import visaLogo from "@/app/[locale]/assets/images/logos/visa.png";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

const partners = [
  {
    name: "valu",
    logo: valuLogo,
  },
  {
    name: "halan",
    logo: halanLogo,
  },
  {
    name: "souhoola",
    logo: souhoolaLogo,
  },
  {
    name: "Forsa",
    logo: forsaLogo,
  },
  {
    name: "visa",
    logo: visaLogo,
  },
  {
    name: "mastercard",
    logo: mastercardLogo,
  },
  {
    name: "Meeza",
    logo: meezaLogo,
  },
];

export default function PayRent() {
  return (
    <section className="mt-24 bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-16 lg:flex-row">
          <div>
            <h2 className="text-3xl font-bold text-primary-900 sm:text-4xl">
              Flexible rent payment
            </h2>

            <p className="mt-4 max-w-xl text-slate-500">
              Pay your rent with ease using multiple payment options including
              credit card, ValU, and more. No more bulk payments—just
              flexibility that fits your needs.
            </p>
            <Button variant="dark" size="lg" className="mt-10" asChild>
              <Link href="/rent-payment">Pay Now</Link>
            </Button>
          </div>
          <div className="max-w-md">
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-8"
            >
              {partners.map((partner) => (
                <li
                  key={partner.name}
                  className="relative inline-flex aspect-video h-20 items-center justify-center rounded-xl border-2 p-4 shadow max-md:[&:nth-of-type(2n)]:top-12 md:[&:nth-of-type(3n-1)]:top-12"
                >
                  <Image
                    className="size-full object-contain"
                    src={partner.logo}
                    alt={partner.name}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
