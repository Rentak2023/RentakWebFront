import Image from "next/image";
import { getTranslations } from "next-intl/server";

import whyUsBackground from "@/app/[locale]/assets/images/why-choose-us.png";
import CertificateIcon from "@/app/[locale]/assets/svgs/certificate-icon";
import CertifiedHomeIcon from "@/app/[locale]/assets/svgs/certified-home-icon";
import PaymentOptionsIcon from "@/app/[locale]/assets/svgs/payment-options-icon";
import RentIcon from "@/app/[locale]/assets/svgs/rent-icon";

import Container from "../ui/container";

export async function WhyUs() {
  const t = await getTranslations("home.why-us");

  const features = [
    {
      name: t("guaranteed-rent.title"),
      description: t("guaranteed-rent.description"),
      icon: CertificateIcon,
    },
    {
      name: t("unit-condition.title"),
      description: t("unit-condition.description"),
      icon: CertifiedHomeIcon,
    },
    {
      name: t("flexible-payment.title"),
      description: t("flexible-payment.description"),
      icon: PaymentOptionsIcon,
    },
    {
      name: t("easy-move-in.title"),
      description: t("easy-move-in.description"),
      icon: RentIcon,
    },
  ];

  return (
    <Container className="pt-24 sm:pt-32">
      <div className="mx-auto flex max-w-2xl flex-col gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:flex-row">
        <div className="col-span-2">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-start">
            {t("title")}
          </h2>

          <p className="mt-2 text-center text-lg text-slate-600 md:text-start">
            {t("subtitle")}
          </p>

          <dl className="mt-14 grid grid-cols-1 gap-x-24 gap-y-10 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="mx-auto flex flex-col">
                <dt className="text-primary-800 flex flex-col items-start justify-start gap-3 text-base/7 font-semibold">
                  <div className="bg-primary-600/5 flex size-12 items-center justify-center rounded-full p-2">
                    <feature.icon
                      className="text-primary-800 size-6"
                      aria-hidden="true"
                    />
                  </div>
                  <span>{feature.name}</span>
                </dt>
                <dd className="mt-1 text-balance text-sm/6 text-slate-600 md:max-w-64">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mx-auto flex max-w-[26rem] lg:me-0 lg:ms-auto">
          <Image
            src={whyUsBackground}
            alt=""
            className="w-full rounded-lg object-cover"
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            width={416}
          />
        </div>
      </div>
    </Container>
  );
}
