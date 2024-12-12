import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

export default function PropertyRequest() {
  const t = useTranslations("tenant.property-request");
  return (
    <div className="mx-auto mt-32 flex max-w-7xl flex-col items-center justify-between gap-y-12 px-4 sm:px-6 lg:flex-row lg:px-8">
      <div>
        <p className="text-lg font-medium text-primary-800">{t("question")}</p>
        <h2 className="mt-6 text-4xl font-semibold tracking-tight text-primary-900">
          {t("title")}
        </h2>
        <p className="mt-6 text-primary-800">{t("description")}</p>
      </div>
      <Button variant="dark" size="lg">
        {t("cta")}
      </Button>
    </div>
  );
}
