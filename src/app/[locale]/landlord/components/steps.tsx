import { useTranslations } from "next-intl";
import { useId } from "react";

const steps = [
  {
    title: "Get Started with Ease",
    color: "#CEEBBB",
  },
  {
    title: "Professional Unit Photography & Inspection",
    color: "#D8BBEB",
  },
  {
    title: "Maximize Exposure",
    color: "#EBC0BB",
  },
  {
    title: "Find the Perfect Tenant",
    color: "#D2A78C",
  },
  {
    title: "Seamless Contract Signing",
    color: "#DEA9AF",
  },
  {
    title: "Hassle-Free Rent Collection",
    color: "#A78CD2",
  },
];

function Dashes({ from, to }: { from: string; to: string }) {
  const id = useId();
  return (
    <div className="absolute start-1 top-[70px] -z-10 flex w-[40px] items-center justify-center max-lg:rotate-90 max-lg:scale-[1.8] lg:start-[60%] lg:top-6 lg:w-full rtl:lg:rotate-180">
      <svg
        width="303"
        height="16"
        viewBox="0 0 303 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 3H303V13H0V3Z" fill={`url(#${id})`}></path>
        <path
          d="M25.3452 2.03174L30.972 7.78935C31.3517 8.17793 31.3517 8.79863 30.972 9.18722L25.3452 14.9448"
          stroke="white"
          strokeWidth="3"
        ></path>
        <path
          d="M58.3452 2.03174L63.972 7.78935C64.3517 8.17793 64.3517 8.79863 63.972 9.18722L58.3452 14.9448"
          stroke="white"
          strokeWidth="3"
        ></path>
        <path
          d="M91.3452 2.03174L96.972 7.78935C97.3517 8.17793 97.3517 8.79863 96.972 9.18722L91.3452 14.9448"
          stroke="white"
          strokeWidth="3"
        ></path>
        <path
          d="M124.345 2.03174L129.972 7.78935C130.352 8.17793 130.352 8.79863 129.972 9.18722L124.345 14.9448"
          stroke="white"
          strokeWidth="3"
        ></path>
        <path
          d="M157.345 2.03174L162.972 7.78935C163.352 8.17793 163.352 8.79863 162.972 9.18722L157.345 14.9448"
          stroke="white"
          strokeWidth="3"
        ></path>
        <path
          d="M190.345 2.03174L195.972 7.78935C196.352 8.17793 196.352 8.79863 195.972 9.18722L190.345 14.9448"
          stroke="white"
          strokeWidth="3"
        ></path>
        <path
          d="M223.345 2.03174L228.972 7.78935C229.352 8.17793 229.352 8.79863 228.972 9.18722L223.345 14.9448"
          stroke="white"
          strokeWidth="3"
        ></path>
        <path
          d="M256.345 2.03174L261.972 7.78935C262.352 8.17793 262.352 8.79863 261.972 9.18722L256.345 14.9448"
          stroke="white"
          strokeWidth="3"
        ></path>
        <path
          d="M289.345 2.03174L294.972 7.78935C295.352 8.17793 295.352 8.79863 294.972 9.18722L289.345 14.9448"
          stroke="white"
          strokeWidth="3"
        ></path>
        <defs>
          <linearGradient
            id={id}
            x1="6.56397"
            y1="8"
            x2="294.672"
            y2="8.0001"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={from}></stop>
            <stop offset="1" stopColor={to}></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Steps() {
  const t = useTranslations("landlord.steps");
  const steps = [
    {
      title: t("get-started"),
      color: "#CEEBBB",
    },
    {
      title: t("inspection"),
      color: "#D8BBEB",
    },
    {
      title: t("exposure"),
      color: "#EBC0BB",
    },
    {
      title: t("find-tenant"),
      color: "#D2A78C",
    },
    {
      title: t("contract"),
      color: "#DEA9AF",
    },
    {
      title: t("collection"),
      color: "#A78CD2",
    },
  ];
  return (
    <section className="mt-28">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-semibold tracking-tight text-primary-900">
          {t("title")}
        </h2>
        <div className="mx-auto mt-16 flex flex-col items-center justify-start">
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
        </div>
      </div>
    </section>
  );
}
