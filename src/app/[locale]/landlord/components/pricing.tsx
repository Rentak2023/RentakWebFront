"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import clsx from "clsx";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

type Frequency = {
  value: "monthly" | "annually";
  label: string;
  priceSuffix: string;
};

const frequencies: Array<Frequency> = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
  { value: "annually", label: "Annually", priceSuffix: "/year" },
] as const;

type Tier = {
  name: string;
  id: string;
  href: string;
  price: { monthly: string; annually: string } | string;
  description: string;
  features: Array<string>;
  featured: boolean;
  cta: string;
};

const tiers: Array<Tier> = [
  {
    name: "Freelancer",
    id: "tier-freelancer",
    href: "#",
    price: { monthly: "$15", annually: "$144" },
    description: "The essentials to provide your best work for clients.",
    features: [
      "5 products",
      "Up to 1,000 subscribers",
      "Basic analytics",
      "48-hour support response time",
    ],
    featured: false,
    cta: "Buy plan",
  },
  {
    name: "Startup",
    id: "tier-startup",
    href: "#",
    price: { monthly: "$30", annually: "$288" },
    description: "A plan that scales with your rapidly growing business.",
    features: [
      "25 products",
      "Up to 10,000 subscribers",
      "Advanced analytics",
      "24-hour support response time",
      "Marketing automations",
    ],
    featured: false,
    cta: "Buy plan",
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#",
    price: "Custom",
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "Unlimited products",
      "Unlimited subscribers",
      "Advanced analytics",
      "1-hour, dedicated support response time",
      "Marketing automations",
      "Custom reporting tools",
    ],
    featured: true,
    cta: "Contact sales",
  },
];

export default function Pricing() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [frequency, setFrequency] = useState<Frequency>(frequencies[0]!);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Pricing plans for teams of all sizes
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-600">
          Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et
          quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.
        </p>
        <div className="mt-16 flex justify-center">
          <fieldset aria-label="Payment frequency">
            <RadioGroupPrimitive.Root
              value={frequency.value}
              onValueChange={(frequency) => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                setFrequency(frequencies.find((f) => f.value === frequency)!);
              }}
              className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-slate-200"
            >
              {frequencies.map((option) => (
                <RadioGroupPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer rounded-full px-2.5 py-1 text-slate-500 data-[state=checked]:bg-primary-600 data-[state=checked]:text-white"
                >
                  {option.label}
                </RadioGroupPrimitive.Item>
              ))}
            </RadioGroupPrimitive.Root>
          </fieldset>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={clsx(
                tier.featured
                  ? "bg-slate-900 ring-slate-900"
                  : "ring-slate-200",
                "rounded-3xl p-8 ring-1 xl:p-10",
              )}
            >
              <h3
                id={tier.id}
                className={clsx(
                  tier.featured ? "text-white" : "text-slate-900",
                  "text-lg font-semibold leading-8",
                )}
              >
                {tier.name}
              </h3>
              <p
                className={clsx(
                  tier.featured ? "text-slate-300" : "text-slate-600",
                  "mt-4 text-sm leading-6",
                )}
              >
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span
                  className={clsx(
                    tier.featured ? "text-white" : "text-slate-900",
                    "text-4xl font-bold tracking-tight",
                  )}
                >
                  {typeof tier.price === "string"
                    ? tier.price
                    : tier.price[frequency.value]}
                </span>
                {typeof tier.price === "string" ? null : (
                  <span
                    className={clsx(
                      tier.featured ? "text-slate-300" : "text-slate-600",
                      "text-sm font-semibold leading-6",
                    )}
                  >
                    {frequency.priceSuffix}
                  </span>
                )}
              </p>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={clsx(
                  tier.featured
                    ? "bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white"
                    : "bg-primary-600 text-white shadow-sm hover:bg-primary-500 focus-visible:outline-primary-600",
                  "mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                )}
              >
                {tier.cta}
              </a>
              <ul
                role="list"
                className={clsx(
                  tier.featured ? "text-slate-300" : "text-slate-600",
                  "mt-8 space-y-3 text-sm leading-6 xl:mt-10",
                )}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      aria-hidden="true"
                      className={clsx(
                        tier.featured ? "text-white" : "text-primary-600",
                        "h-6 w-5 flex-none",
                      )}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
