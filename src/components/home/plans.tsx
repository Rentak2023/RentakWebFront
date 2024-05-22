import clsx from "clsx";
import { useTranslations } from "next-intl";

import SectionTitle from "./components/section-title";

export function Plans() {
  const t = useTranslations("home.plans");

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
        name: t("monthly-reminder.title"),
        tiers: {
          traditional: t("monthly-reminder.traditional"),
          rentak: t("monthly-reminder.rentak"),
        },
      },
      {
        name: t("unit-condition.title"),
        tiers: {
          traditional: t("unit-condition.traditional"),
          rentak: t("unit-condition.rentak"),
        },
      },
      {
        name: t("unpaid-bills.title"),
        tiers: {
          traditional: t("unpaid-bills.traditional"),
          rentak: t("unpaid-bills.rentak"),
        },
      },
      {
        name: t("legal-support.title"),
        tiers: {
          traditional: t("legal-support.traditional"),
          rentak: t("legal-support.rentak"),
        },
      },
    ],
  } as const;

  return (
    <div className="relative pt-24 sm:pt-32">
      <SectionTitle text={t("title")} />

      <div className="mx-auto max-w-7xl px-6 lg:mt-12 lg:rounded-2xl lg:p-10 lg:pb-14 lg:shadow-lg">
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
                      tier.featured ? "text-primary" : "text-slate-900",
                    )}
                  >
                    {tier.name}
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
                      "text-lg font-medium leading-6",
                      tier.featured ? "text-primary" : "text-slate-900",
                    )}
                  >
                    {tier.name}
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
