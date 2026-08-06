import { useTranslations } from "next-intl";

import Container from "@/components/ui/container";

export default function HowItWorks() {
  const t = useTranslations("landlord.how-it-works");

  const steps = [
    {
      num: 1,
      image: "/images/how-it-works-1.png",
      title: t("step-1.title"),
      description: t("step-1.description"),
    },
    {
      num: 2,
      image: "/images/how-it-works-2.png",
      title: t("step-2.title"),
      description: t("step-2.description"),
    },
    {
      num: 3,
      image: "/images/how-it-works-3.png",
      title: t("step-3.title"),
      description: t("step-3.description"),
    },
    {
      num: 4,
      image: "/images/how-it-works-4.png",
      title: t("step-4.title"),
      description: t("step-4.description"),
    },
    {
      num: 5,
      image: "/images/how-it-works-5.png",
      title: t("step-5.title"),
      description: t("step-5.description"),
    },
  ];

  return (
    <Container className="flex flex-col items-center justify-stretch pt-24 sm:pt-32">
      <h2 className="mb-12 text-center text-4xl font-bold text-slate-900">
        {t("title")}
      </h2>

      <div className="flex w-full overflow-x-auto snap-x snap-mandatory gap-6 pb-6">
        {steps.map((step) => (
          <div
            key={step.num}
            className="flex min-w-[280px] max-w-[320px] flex-1 snap-center flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200"
          >
            <div className="relative aspect-video w-full">
              <img
                src={step.image}
                alt={step.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute left-3 top-3 flex size-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-sm">
                {step.num}
              </div>
            </div>
            <div className="flex flex-col p-5">
              <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
