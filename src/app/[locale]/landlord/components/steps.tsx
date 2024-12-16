import { useTranslations } from "next-intl";

export default function Steps() {
  const t = useTranslations("landlord.steps");
  const steps = [
    {
      title: t("get-started.title"),
      color: "#CEEBBB",
      description: t("get-started.description"),
    },
    {
      title: t("inspection.title"),
      color: "#D8BBEB",
      description: t("inspection.description"),
    },
    {
      title: t("exposure.title"),
      color: "#EBC0BB",
      description: t("exposure.description"),
    },
    {
      title: t("find-tenant.title"),
      color: "#D2A78C",
      description: t("find-tenant.description"),
    },
    {
      title: t("contract.title"),
      color: "#DEA9AF",
      description: t("contract.description"),
    },
    {
      title: t("collection.title"),
      color: "#A78CD2",
      description: t("collection.description"),
    },
  ];
  return (
    <section className="mt-28">
      <div className="container mx-auto">
        <h2 className="text-primary-900 text-center text-4xl font-semibold tracking-tight">
          {t("title")}
        </h2>
        {/* <div className="mx-auto mt-16 flex flex-col items-center justify-start">
          <div className="grid auto-cols-auto gap-10 lg:grid-cols-6">
            {steps.map((step, index) => {
              const nextStep = steps.at(index + 1);
              return (
                <div
                  className="relative flex min-h-12 flex-col items-start justify-start gap-3 ps-[60px] lg:min-h-fit lg:items-center lg:ps-0"
                  key={step.title}
                >
                  <div className="z-10 flex size-12 items-center justify-center max-lg:absolute max-lg:inset-0 max-lg:end-auto lg:size-16">
                    <div
                      className="flex size-full items-center justify-center rounded-full"
                      style={{
                        backgroundColor: step.color,
                      }}
                    >
                      <span className="text-3xl font-medium text-primary-800">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  {nextStep && <Dashes from={step.color} to={nextStep.color} />}
                  <div className="max-w-[90%] text-start tracking-tight text-slate-600 lg:text-center lg:text-xl">
                    {step.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div> */}

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
              <h3 className="text-primary-800 font-medium leading-tight">
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
