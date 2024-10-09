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
  description?: string;
  features: Array<string>;
  featured: boolean;
  cta: string;
};

const tiers: Array<Tier> = [
  {
    name: "Rentak Collect",
    id: "tier-collect",
    href: "#",
    price: "3%",
    description: "The essentials to provide your best work for clients.",
    features: [
      "The Rentak Collection Package Benefit is 2.5%",
      "Payment Reminders: Monthly rent reminders to tenants.",
      "Multiple Payment Methods: Tenants can choose from several payment options.",
      "Direct Transfers: Rent is transferred directly to landlords.",
    ],
    featured: false,
    cta: "Choose",
  },
  {
    name: "Rentak Basic",
    id: "tier-basic",
    href: "#",
    price: "5%",
    description: "A plan that scales with your rapidly growing business.",
    features: [
      "Payment Reminders: Monthly rent reminders to tenants.",
      "Multiple Payment Methods: Tenants can choose from several payment options.",
      "Marketing & Promotion: Your property is marketed to Rentak's network and listed on platforms.",
      "Legal Contracts: Creation of legally compliant contracts.",
      "Direct Transfers: Rent is transferred directly to landlords.",
      "Status Reporting: Updates on rental status, including unpaid rent.",
      "Property Handover Reports: Full inspection report when returning the unit.",
    ],
    featured: false,
    cta: "Choose",
  },
  {
    name: "Rentak Secure",
    id: "tier-secure",
    href: "#",
    price: "10%",
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "Payment Reminders: Monthly rent reminders to tenants.",
      "Multiple Payment Methods: Tenants can choose from several payment options.",
      "Marketing & Promotion: Your property is marketed to Rentak's network and listed on platforms.",
      "Legal Contracts: Creation of legally compliant contracts.",
      "Direct Transfers: Rent is transferred directly to landlords.",
      "Guaranteed Rent: Rentak ensures you receive rent same day every month, even if tenants fail to pay.",
      "Property Protection: Eviction handling and legal costs covered.",
      "Complete Unit Care: Ensures the property is returned in the same condition, including maintenance.",
    ],
    featured: true,
    cta: "Choose",
  },
];

export default function Pricing() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [frequency, setFrequency] = useState<Frequency>(frequencies[0]!);

  return (
    <div className="mt-44 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="sr-only">Plans</h2>
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-primary-900 sm:text-5xl">
            Choose the Perfect Plan for Your Rental Needs
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-600">
          Compare Rentak’s service packages and pick the one that offers you the
          right level of convenience, protection, and peace of mind.
        </p>
        {/* <div className="mt-16 flex justify-center">
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
        </div> */}
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={clsx(
                tier.featured
                  ? "bg-primary-800 ring-primary-800"
                  : "ring-slate-200",
                "rounded-3xl p-8 ring-1 xl:p-10",
              )}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  id={tier.id}
                  className={clsx(
                    tier.featured ? "text-white" : "text-primary-800",
                    "text-xl font-medium leading-8",
                  )}
                >
                  {tier.name}
                </h3>
                {tier.featured && (
                  <p className="rounded-full bg-white/50 px-2.5 py-1 text-xs font-semibold leading-5 text-primary-800">
                    Most popular
                  </p>
                )}
              </div>
              <p
                className={clsx(
                  tier.featured ? "text-slate-300" : "text-slate-600",
                  "mt-4 text-sm leading-6",
                )}
              >
                {tier.description}
              </p>
              {/* <p className="mt-6 flex items-baseline gap-x-1">
                <span
                  className={clsx(
                    tier.featured ? "text-white" : "text-primary-800",
                    "text-6xl font-semibold tracking-tight",
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
              </p> */}
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={clsx(
                  tier.featured
                    ? "bg-white/80 text-primary-800 hover:bg-white/60 focus-visible:outline-white"
                    : "bg-primary-800 text-white shadow-sm hover:bg-primary-800/90 focus-visible:outline-primary-600",
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
