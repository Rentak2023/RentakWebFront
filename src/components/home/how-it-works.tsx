import { useTranslations } from "next-intl";

import SectionTitle from "./components/section-title";

export function HowItWorks() {
  const t = useTranslations("home.how-it-works");

  const steps = [
    {
      title: t("submit.title"),
      description: t("submit.description"),
    },
    {
      title: t("manage.title"),
      description: t("manage.description"),
    },
    {
      title: t("secure.title"),
      description: t("secure.description"),
    },
    {
      title: t("end.title"),
      description: t("end.description"),
    },
  ];

  return (
    <div className="pt-24 sm:pt-32">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-stretch px-6 md:px-8">
        <SectionTitle text={t("title")} />
        <div className="relative mt-12">
          {steps.map((step) => (
            <div
              className="group relative flex items-start justify-between before:absolute before:inset-0 before:top-6 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-slate-200 last-of-type:before:hidden md:justify-normal md:before:mx-auto md:before:translate-x-0 md:odd:flex-row-reverse"
              key={step.title}
            >
              <div
                className="mt-6 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary
                ring-4
          ring-primary ring-offset-2 md:order-1 ltr:md:group-odd:-translate-x-1/2 ltr:md:group-even:translate-x-1/2 rtl:md:group-odd:translate-x-1/2 rtl:md:group-even:-translate-x-1/2"
              />
              <hr />
              <div className="w-[calc(100%-3rem)] p-4 md:w-[calc(50%-1rem)]">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold text-primary-shade-3">
                    {step.title}
                  </p>
                </div>
                <p className="mt-4 text-slate-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
