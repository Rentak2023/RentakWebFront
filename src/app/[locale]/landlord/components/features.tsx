import { KeyIcon } from "lucide-react";

const features = [
  {
    title: "Property Management",
    description:
      "Let us handle the day-to-day management of your property. From tenant screening to rent collection till the end of your rental contract, Rentak ensures your property is well-managed and tenants are happy.",
    cta: "Simplify Property Management",
    icon: KeyIcon,
    href: "/",
  },
  {
    title: "Rent Collection",
    description:
      "Automate your rent collection process with our secure and reliable system. Receive payments on time, every time, with full transparency and detailed reporting.",
    cta: "Start Collecting with Ease",
    icon: KeyIcon,
    href: "/",
  },
  {
    title: "Promote Your Property",
    description:
      "Reach more potential tenants by promoting your property on Rentak. Our platform connects you with high-quality brokers and tenants faster.",
    cta: "Promote My Property",
    icon: KeyIcon,
    href: "/",
  },
  {
    title: "Property Valuation",
    description:
      "Understand the true value of your property with our comprehensive valuation service. Get insights into market trends and rental potential to make informed decisions.",
    cta: "Get Your Property Valued",
    icon: KeyIcon,
    href: "/",
  },
  {
    title: "Legal Contract Creation",
    description:
      "Create rental contract in a minute. Our contracts are tailored to protect your interests and comply with all relevant regulations.",
    cta: "Create Your Contract",
    icon: KeyIcon,
    href: "/",
  },
  {
    title: "Pay Annual Maintenance Fees",
    description:
      "Easily manage and pay your property’s annual maintenance fees directly through Rentak. Through our various payment methods, you can pay your fees from 6-60 months, so you avoid any penalties.",
    cta: "Manage Maintenance Fees",
    icon: KeyIcon,
    href: "/",
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
    <div className="mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-capitalized text-3xl font-semibold tracking-tight text-primary-900 sm:text-4xl">
            Services that we support
          </h2>
          {/* <p className="mt-6 text-lg leading-8 text-slate-600">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis in accusamus quisquam.
          </p> */}
        </div>
        <div className="mx-auto mt-8 max-w-2xl sm:mt-12 lg:mt-16 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-primary-900">
                  <div className="mb-6 flex size-10 items-center justify-center rounded-lg border border-slate-300 bg-white">
                    <feature.icon
                      aria-hidden="true"
                      className="size-6 text-primary-800"
                    />
                  </div>
                  {feature.title}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-slate-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-4">
                    <a
                      href={feature.href}
                      className="text-sm font-semibold leading-6 text-primary-700 underline"
                    >
                      {feature.cta}
                      {/* <span aria-hidden="true">→</span> */}
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        {/* <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 xl:max-w-7xl">
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
        </div> */}
      </div>
    </div>
  );
};

export default Features;
