"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useQueryStates } from "nuqs";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { propertiesQueryParsers } from "@/services/properties";

function SodicBanner() {
  const t = useTranslations("units");
  const [, setSearchParams] = useQueryStates(propertiesQueryParsers);

  const handleExplore = () => {
    // Set keyword to "sodic" to trigger listings filter, and reset page to 1
    void setSearchParams({
      keyword: "sodic",
      page: 1,
    });
  };

  return (
    <div className="relative isolate overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-10 lg:p-12">
      {/* Background Decorative Glows */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-96 w-96 rounded-full bg-indigo-50 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-96 w-96 rounded-full bg-blue-50 blur-3xl" />

      {/* Grid Layout */}
      <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center">
        {/* Text Content */}
        <div className="flex flex-col items-start lg:col-span-2">
          {/* Heading */}
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:leading-tight">
            {t("sodicBanner.title")}
          </h2>

          {/* Description */}
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {t("sodicBanner.description")}
          </p>

          {/* Action Button */}
          <div className="mt-8">
            <Button
              onClick={handleExplore}
              className="relative inline-flex items-center overflow-hidden rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:scale-[1.02] hover:bg-indigo-500 active:scale-[0.98]"
            >
              {t("sodicBanner.cta")}
            </Button>
          </div>
        </div>

        {/* Brand Showcase Logo */}
        <div className="flex justify-center lg:justify-end">
          <div className="flex flex-col items-center gap-3 w-full max-w-[280px]">
            <div className="group relative flex h-40 w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-colors duration-300 hover:border-slate-300">
              {/* Glowing background hint behind logo */}
              <div className="absolute inset-0 bg-radial-gradient from-indigo-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative h-20 w-full">
                <Image
                  src="/images/sodic-logo.png"
                  alt="SODIC Logo"
                  fill
                  sizes="(max-w-[280px]) 100vw, 280px"
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            </div>
            {/* Partnership Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1 text-xs font-semibold tracking-wider text-indigo-600 shadow-sm uppercase">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              {t("sodicBanner.badge")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SodicBanner;
