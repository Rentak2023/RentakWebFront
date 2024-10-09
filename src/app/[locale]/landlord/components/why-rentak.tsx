import clsx from "clsx";
import Image from "next/image";

import logo from "@/app/[locale]/assets/images/Logo.png";

export default function WhyRentak() {
  const plans = {
    plans: [
      {
        id: "rentak",
        name: "Rentak",
        featured: true,
      },
      {
        id: "traditional",
        name: "Traditional Rent",
        featured: false,
      },
    ],
    features: [
      "process",
      "Rent paid to you, even if tenant doesn't pay",
      "Rental income continues during vacancies",
      "Protection against rental fraud",
      "Eviction protection",
    ],
  } as const;

  return (
    <div className="mt-32">
      <h2 className="text-center text-4xl font-semibold capitalize leading-7 tracking-tight text-slate-900">
        Why choose rentak?
      </h2>

      <p className="mx-auto mt-8 max-w-5xl px-4 text-center text-2xl text-slate-600">
        At Rentak, we understand that managing rental properties can be
        time-consuming and stressful. That’s why we offer a full suite of
        property management services designed to simplify your life, protect
        your investment, and maximize your rental income. Whether you want
        guaranteed rent, comprehensive property management, or flexible options
        tailored to your needs, Rentak has you covered.
      </p>

      {/* <div className="lg:solid-shadow mx-auto mt-16 max-w-7xl px-6 pt-4 lg:rounded-2xl lg:border lg:p-0 lg:shadow-lg">
        <section
          aria-labelledby="mobile-comparison-heading"
          className="lg:hidden"
        >
          <h2 id="mobile-comparison-heading" className="sr-only">
            Feature comparison
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
                  <div
                    aria-hidden="true"
                    className="absolute inset-y-0 end-0 -z-10 block w-1/3 rounded-lg bg-slate-50"
                  />

                  <dl className="text-sm leading-6">
                    {plans.features.map((feature) => (
                      <div
                        key={feature}
                        className="grid grid-cols-3 items-center justify-between px-0 py-3"
                      >
                        <dt className="col-span-2 font-medium text-slate-800">
                          {feature}
                        </dt>
                        <dd className="flex items-center justify-center px-4">
                          {tier.featured ? (
                            <svg
                              width="27"
                              height="25"
                              viewBox="0 0 27 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.4787 24.4009C20.1462 24.4009 25.5512 18.9958 25.5512 12.3284C25.5512 5.6609 20.1462 0.255859 13.4787 0.255859C6.81129 0.255859 1.40625 5.6609 1.40625 12.3284C1.40625 18.9958 6.81129 24.4009 13.4787 24.4009Z"
                                fill="#48BB78"
                              />
                              <path
                                d="M7.74609 12.6425L11.593 16.4899L19.2079 8.875"
                                stroke="white"
                                strokeWidth="1.756"
                                strokeLinecap="round"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="26"
                              height="25"
                              viewBox="0 0 26 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.1272 24.4009C19.7946 24.4009 25.1997 18.9958 25.1997 12.3284C25.1997 5.6609 19.7946 0.255859 13.1272 0.255859C6.45973 0.255859 1.05469 5.6609 1.05469 12.3284C1.05469 18.9958 6.45973 24.4009 13.1272 24.4009Z"
                                fill="#F56565"
                              />
                              <path
                                d="M17.4545 8.11719L8.91797 16.6537"
                                stroke="white"
                                strokeWidth="1.756"
                                strokeLinecap="round"
                              />
                              <path
                                d="M17.2475 16.7416L8.71094 8.20508"
                                stroke="white"
                                strokeWidth="1.756"
                                strokeLinecap="round"
                              />
                            </svg>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="comparison-heading"
          className="hidden lg:block"
        >
          <h2 id="comparison-heading" className="sr-only">
            Feature comparison
          </h2>

          <table className="w-full border-collapse overflow-hidden rounded-2xl">
            <thead className="bg-primary-100/30">
              <tr className="grid grid-cols-5 text-start">
                <th scope="col" className="border"></th>
                {plans.plans.map((tier) => (
                  <th
                    key={tier.name}
                    scope="col"
                    className="col-span-2 border py-6"
                  >
                    <span
                      className={clsx(
                        "flex items-center justify-center text-center text-xl font-semibold size-full",
                        tier.featured ? "text-primary-600" : "text-slate-900",
                      )}
                    >
                      {tier.featured ? (
                        <Image src={logo} alt="Rentak" height={24} />
                      ) : (
                        tier.name
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plans.features.map((feature) => (
                <tr key={feature} className="grid grid-cols-5">
                  <th
                    scope="row"
                    className="border px-6 py-4 text-center text-lg font-medium text-slate-800"
                  >
                    {feature}
                  </th>
                  {plans.plans.map((tier) => (
                    <td
                      key={tier.name}
                      className="col-span-2 border px-6 py-4 text-center"
                    >
                      <span className="inline-flex size-full items-center justify-center">
                        {tier.featured ? (
                          <svg
                            width="27"
                            height="25"
                            viewBox="0 0 27 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.4787 24.4009C20.1462 24.4009 25.5512 18.9958 25.5512 12.3284C25.5512 5.6609 20.1462 0.255859 13.4787 0.255859C6.81129 0.255859 1.40625 5.6609 1.40625 12.3284C1.40625 18.9958 6.81129 24.4009 13.4787 24.4009Z"
                              fill="#48BB78"
                            />
                            <path
                              d="M7.74609 12.6425L11.593 16.4899L19.2079 8.875"
                              stroke="white"
                              strokeWidth="1.756"
                              strokeLinecap="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="26"
                            height="25"
                            viewBox="0 0 26 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.1272 24.4009C19.7946 24.4009 25.1997 18.9958 25.1997 12.3284C25.1997 5.6609 19.7946 0.255859 13.1272 0.255859C6.45973 0.255859 1.05469 5.6609 1.05469 12.3284C1.05469 18.9958 6.45973 24.4009 13.1272 24.4009Z"
                              fill="#F56565"
                            />
                            <path
                              d="M17.4545 8.11719L8.91797 16.6537"
                              stroke="white"
                              strokeWidth="1.756"
                              strokeLinecap="round"
                            />
                            <path
                              d="M17.2475 16.7416L8.71094 8.20508"
                              stroke="white"
                              strokeWidth="1.756"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div> */}
    </div>
  );
}
