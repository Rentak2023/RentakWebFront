import clsx from "clsx";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import logo from "@/app/[locale]/assets/images/Logo.png";

import SectionTitle from "./components/section-title";

export async function Plans() {
  const t = await getTranslations("home.plans");

  const plans = {
    plans: [
      {
        id: "traditional",
        name: t("traditional-rent"),
        featured: false,
      },
      {
        id: "rentak",
        name: "Rentak",
        featured: true,
      },
    ],
    features: [
      {
        name: t("finding-tenants.title"),
        tiers: {
          traditional: t("finding-tenants.traditional"),
          rentak: t("finding-tenants.rentak"),
        },
      },
      {
        name: t("rent-collection.title"),
        tiers: {
          traditional: t("rent-collection.traditional"),
          rentak: t("rent-collection.rentak"),
        },
      },
      {
        name: t("property-management.title"),
        tiers: {
          traditional: t("property-management.traditional"),
          rentak: t("property-management.rentak"),
        },
      },
      {
        name: t("tenant-screening.title"),
        tiers: {
          traditional: t("tenant-screening.traditional"),
          rentak: t("tenant-screening.rentak"),
        },
      },
      {
        name: t("security-deposit.title"),
        tiers: {
          traditional: t("security-deposit.traditional"),
          rentak: t("security-deposit.rentak"),
        },
      },
      {
        name: t("flexible-payment.title"),
        tiers: {
          traditional: t("flexible-payment.traditional"),
          rentak: t("flexible-payment.rentak"),
        },
      },
    ],
  } as const;

  return (
    <div className="relative pt-24 sm:pt-32">
      <SectionTitle text={t("title")} />

      <p className="mt-4 text-center text-lg text-slate-600">{t("subtitle")}</p>

      <div className="mx-auto mt-12 max-w-7xl px-6 pt-4 lg:rounded-2xl lg:px-10 lg:pb-14 lg:shadow">
        {/* Feature comparison (up to lg) */}
        <section
          aria-labelledby="mobile-comparison-heading"
          className="lg:hidden"
        >
          <h2 id="mobile-comparison-heading" className="sr-only">
            {t("feature-comparison")}
          </h2>

          <div className="mx-auto max-w-2xl space-y-16">
            {plans.plans.map((tier) => (
              <div key={tier.name}>
                <div className="-mt-px w-72 pt-10 md:w-80">
                  <h3
                    className={clsx(
                      "text-lg font-medium leading-6",
                      tier.featured ? "text-primary-600" : "text-slate-900",
                    )}
                  >
                    {tier.featured ? (
                      <Image src={logo} alt="Rentak" height={24} />
                    ) : (
                      tier.name
                    )}
                  </h3>
                </div>

                <div className="relative mt-10">
                  {/* Fake card background */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-y-0 end-0 -z-10 block w-2/3 rounded-lg bg-slate-50"
                  />

                  <dl className="text-sm leading-6">
                    {plans.features.map((feature) => (
                      <div
                        key={feature.name}
                        className="grid grid-cols-3 items-center justify-between px-0 py-3"
                      >
                        <dt className="font-medium text-slate-800">
                          {feature.name}
                        </dt>
                        <dd className="col-span-2 flex items-center justify-start px-4">
                          <span className="text-slate-500">
                            {feature.tiers[tier.id]}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature comparison (lg+) */}
        <section
          aria-labelledby="comparison-heading"
          className="hidden lg:block"
        >
          <h2 id="comparison-heading" className="sr-only">
            Feature comparison
          </h2>

          <div className="grid grid-cols-5 gap-x-8">
            {/* Empty div to align headings with table */}
            <div />
            {plans.plans.map((tier) => (
              <div key={tier.name} aria-hidden="true" className="col-span-2">
                <div className="px-6 pt-10">
                  <p
                    className={clsx(
                      "flex items-center justify-center text-center text-xl font-semibold",
                      tier.featured ? "text-primary-600" : "text-slate-900",
                    )}
                  >
                    {tier.featured ? (
                      <Image src={logo} alt="Rentak" height={24} />
                    ) : (
                      tier.name
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-12">
            {/* Fake card backgrounds */}
            <div
              className="absolute -inset-y-4 inset-x-0 -z-10 grid grid-cols-5"
              aria-hidden="true"
            >
              <div className="me-8 size-full" />
              <div className="col-span-4 grid size-full grid-cols-2 rounded-lg bg-slate-50">
                <div />
                <div className="my-8 ms-4 border-s" />
              </div>
            </div>

            <table className="w-full">
              <thead>
                <tr className="text-start">
                  <th scope="col">
                    <span className="sr-only">Feature</span>
                  </th>
                  {plans.plans.map((tier) => (
                    <th key={tier.name} scope="col">
                      <span className="sr-only">{tier.name} tier</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {plans.features.map((feature) => (
                  <tr key={feature.name} className="grid grid-cols-5 gap-x-8">
                    <th
                      scope="row"
                      className="py-3 pe-4 text-start text-lg font-medium text-slate-800"
                    >
                      {feature.name}
                    </th>
                    {plans.plans.map((tier) => (
                      <td
                        key={tier.name}
                        className="col-span-2 px-6 py-4 text-start"
                      >
                        <span className="size-full py-3">
                          <span className="text-lg text-slate-500">
                            {feature.tiers[tier.id]}
                          </span>
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
