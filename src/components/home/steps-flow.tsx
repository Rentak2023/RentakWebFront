import { getTranslations } from "next-intl/server";
import { PlusCircle, ShieldCheck, Handshake, FileSignature, Wallet } from "lucide-react";
import Container from "@/components/ui/container";

export async function StepsFlow() {
  const t = (await getTranslations("home.steps-flow" as any)) as unknown as (key: string) => string;

  const steps = [
    {
      id: "01",
      title: t("step-1.title"),
      description: t("step-1.description"),
      icon: PlusCircle,
      gradient: "from-blue-500/10 to-indigo-500/10",
      iconColor: "text-blue-600",
    },
    {
      id: "02",
      title: t("step-2.title"),
      description: t("step-2.description"),
      icon: ShieldCheck,
      gradient: "from-emerald-500/10 to-teal-500/10",
      iconColor: "text-emerald-600",
    },
    {
      id: "03",
      title: t("step-3.title"),
      description: t("step-3.description"),
      icon: Handshake,
      gradient: "from-amber-500/10 to-orange-500/10",
      iconColor: "text-amber-600",
    },
    {
      id: "04",
      title: t("step-4.title"),
      description: t("step-4.description"),
      icon: FileSignature,
      gradient: "from-purple-500/10 to-pink-500/10",
      iconColor: "text-purple-600",
    },
    {
      id: "05",
      title: t("step-5.title"),
      description: t("step-5.description"),
      icon: Wallet,
      gradient: "from-sky-500/10 to-cyan-500/10",
      iconColor: "text-sky-600",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50/50 py-24 sm:py-32">
      {/* Decorative background grid/gradients */}
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50/50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      
      <Container>
        <div className="mx-auto max-w-3xl text-center lg:max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            {t("subtitle")}
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-7xl">
          {/* Main Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-100 hover:shadow-md"
                >
                  <div>
                    {/* Step number and Icon header */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-4xl font-extrabold tracking-tight text-slate-200/80 group-hover:text-primary-800/10 transition-colors">
                        {step.id}
                      </span>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.gradient} p-2.5 transition-transform duration-300 group-hover:scale-110`}>
                        <Icon className={`h-6 w-6 ${step.iconColor}`} />
                      </div>
                    </div>

                    {/* Step content */}
                    <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-primary-800">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  </div>

                  {/* Decorative indicator / connector (pointing to the right on desktop, only for the first 4 steps) */}
                  {idx < 4 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                      <svg
                        className="h-6 w-6 text-slate-300 group-hover:text-primary-400 group-hover:translate-x-1 transition-all rtl:rotate-180 rtl:group-hover:-translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
