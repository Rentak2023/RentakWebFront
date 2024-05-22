import { BriefcaseIcon, HomeIcon, KeyIcon, TruckIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import whyUsBackground from "@/app/[locale]/assets/images/why-choose-us.png";

const features = [
  {
    name: "Spam report",
    description:
      "Donec mattis porta eros, aliquet finibus risus interdum at. Nulla vivethe as it was",
    icon: TruckIcon,
  },
  {
    name: "Compose in markdown",
    description:
      "Donec mattis porta eros, aliquet finibus risus interdum at. Nulla vivethe as it was",
    icon: HomeIcon,
  },
  {
    name: "Email commenting",
    description:
      "Donec mattis porta eros, aliquet finibus risus interdum at. Nulla vivethe as it was",
    icon: KeyIcon,
  },
  {
    name: "Customer connections",
    description:
      "Donec mattis porta eros, aliquet finibus risus interdum at. Nulla vivethe as it was",
    icon: BriefcaseIcon,
  },
];

export function WhyUs() {
  const t = useTranslations("home.why-us");

  return (
    <div className="pt-24 sm:pt-32">
      <div className="container mx-auto px-6 md:px-8 xl:max-w-7xl">
        <div className="mx-auto flex max-w-2xl flex-col gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:flex-row">
          <div className="col-span-2">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {t("title")}
            </h2>

            <p className="mt-4 text-lg text-slate-600">{t("subtitle")}</p>
            <dl className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.name} className="mx-auto flex flex-col">
                  <dt className="text-base/7 font-semibold text-primary-800">
                    <div className="relative mb-6 flex size-8 items-center justify-center rounded-full bg-primary-800/20">
                      <feature.icon
                        className="absolute -start-2 -top-2 size-8 text-primary-800"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-1 text-sm/6 text-slate-600 md:max-w-64">
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
