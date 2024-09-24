import Image from "next/image";

import chartIcon from "@/app/[locale]/assets/svgs/chart.svg";
import globIcon from "@/app/[locale]/assets/svgs/glob.svg";
import shieldIcon from "@/app/[locale]/assets/svgs/shield.svg";
import wrenchIcon from "@/app/[locale]/assets/svgs/wrench.svg";

const features = [
  {
    title: "Property Management",
    description:
      "Let us handle the day-to-day management of your property. From tenant screening to rent collection till the end of your rental contract, Rentak ensures your property is well-managed and tenants are happy.",
    cta: "Simplify Property Management",
    icon: shieldIcon,
  },
  {
    title: "Rent Collection",
    description:
      "Automate your rent collection process with our secure and reliable system. Receive payments on time, every time, with full transparency and detailed reporting.",
    cta: "Start Collecting with Ease",
    icon: shieldIcon,
  },
  {
    title: "Promote Your Property",
    description:
      "Reach more potential tenants by promoting your property on Rentak. Our platform connects you with high-quality brokers and tenants faster.",
    cta: "Promote My Property",
    icon: shieldIcon,
  },
  {
    title: "Property Valuation",
    description:
      "Understand the true value of your property with our comprehensive valuation service. Get insights into market trends and rental potential to make informed decisions.",
    cta: "Get Your Property Valued",
    icon: shieldIcon,
  },
  {
    title: "Legal Contract Creation",
    description:
      "Create rental contract in a minute. Our contracts are tailored to protect your interests and comply with all relevant regulations.",
    cta: "Create Your Contract",
    icon: shieldIcon,
  },
  {
    title: "Pay Annual Maintenance Fees",
    description:
      "Easily manage and pay your property’s annual maintenance fees directly through Rentak. Through our various payment methods, you can pay your fees from 6-60 months, so you avoid any penalties.",
    cta: "Manage Maintenance Fees",
    icon: shieldIcon,
  },
  //
  // {
  //   title: "Legal Contract Creation",
  //   description:
  //     "Create legally sound rental agreements in minutes. Our contracts are tailored to protect your interests and comply with all relevant regulations.",
  //   icon: shieldIcon,
  // },
  // {
  //   title: "Property Valuation",
  //   description:
  //     "Understand the true value of your property with our comprehensive valuation service. Get insights into market trends and rental potential to make informed decisions.",
  //   icon: chartIcon,
  // },
  // {
  //   title: "Pay Annual Maintenance Fees",
  //   description:
  //     "Easily manage and pay your property’s annual maintenance fees directly through Rentak. We ensure timely payments to developers, so you avoid any penalties.",
  //   icon: globIcon,
  // },
  // {
  //   title: "Promote Your Property",
  //   description:
  //     "Reach more potential tenants by promoting your property on Rentak. Our platform connects you with high-quality tenants faster.",
  //   icon: wrenchIcon,
  // },
];

const Features = () => {
  return (
    <div className="mt-32 bg-primary-100/40 py-28">
      <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 xl:max-w-7xl">
        {features.map((feature) => (
          <div
            className="mx-auto flex max-w-7xl flex-col items-start "
            key={feature.title}
          >
            <span className=" rounded-full bg-white p-2 shadow-lg">
              <Image src={feature.icon} alt="" />
            </span>
            <h3 className="mt-6 text-xl font-semibold tracking-tight text-primary-900">
              {feature.title}
            </h3>
            <p className="mb-6 mt-3 text-slate-700">{feature.description}</p>
            <a
              href="/"
              className="mt-auto inline-flex items-center justify-center  rounded-full bg-primary-600 px-4 py-2 font-medium text-slate-50 ring-offset-white transition-colors hover:bg-primary-600/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/90 focus-visible:ring-offset-2"
            >
              {feature.cta}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
