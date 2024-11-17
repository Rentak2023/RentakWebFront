import { useTranslations } from "next-intl";

export default function Steps() {
  const t = useTranslations("tenant.steps");
  const steps = [
    {
      title: t("listing.title"),
      color: "#CEEBBB",
      description: t("listing.description"),
    },
    {
      title: t("viewing.title"),
      color: "#D8BBEB",
      description: t("viewing.description"),
    },
    {
      title: t("payment.title"),
      color: "#EBC0BB",
      description: t("payment.description"),
    },
    {
      title: t("stay.title"),
      color: "#D2A78C",
      description: t("stay.description"),
    },
  ];
  return (
    <section className="mt-28">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-semibold tracking-tight text-primary-900">
          {t("title")}
        </h2>

        <ol className="relative mx-auto mt-16 flex max-w-2xl flex-col gap-5 border-s border-slate-200">
          {steps.map((step, index) => (
            <li className="ms-8" key={step.title}>
              <span
                className="absolute -start-5 flex size-10 items-center justify-center rounded-full p-1 ring-4 ring-white"
                style={{
                  backgroundColor: step.color,
                }}
              >
                {index + 1}
              </span>
              <h3 className="font-medium leading-tight text-primary-800">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
