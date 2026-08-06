import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Link } from "@/i18n/routing";

import SectionTitle from "./components/section-title";

export async function WhatDoesRentakDo() {
  const t = await getTranslations("what-does-rentak-do");

  return (
    <Container
      id="what-does-rentak-do"
      className="flex flex-col items-center justify-stretch pt-24 sm:pt-32"
    >
      <SectionTitle text={t("title")} />

      <div className="mt-12 flex w-full flex-col gap-8 md:flex-row md:justify-center">
        {/* Landlords Section */}
        <div className="flex flex-1 flex-col items-center justify-between gap-6 rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900">
              {t("landlord_title")}
            </h3>
            <p className="mt-4 text-balance text-lg text-slate-600">
              {t("landlord_desc")}
            </p>
          </div>
          <Button asChild size="lg" className="mt-6 w-full sm:w-auto">
            <Link href="/landlord">{t("landlord_cta")}</Link>
          </Button>
        </div>

        {/* Tenants Section */}
        <div className="flex flex-1 flex-col items-center justify-between gap-6 rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900">
              {t("tenant_title")}
            </h3>
            <p className="mt-4 text-balance text-lg text-slate-600">
              {t("tenant_desc")}
            </p>
          </div>
          <Button asChild size="lg" className="mt-6 w-full sm:w-auto">
            <Link href="/tenant">{t("tenant_cta")}</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
