import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export default function PropertyRequest() {
  const t = useTranslations("tenant.property-request");
  return (
    <div className="mx-auto mt-32 flex max-w-7xl flex-col items-center justify-between gap-y-12 px-4 sm:px-6 lg:flex-row lg:px-8">
      <div>
        <p className="text-primary-800 text-lg font-medium">{t("question")}</p>
        <h2 className="text-primary-900 mt-6 text-4xl font-semibold tracking-tight">
          {t("title")}
        </h2>
        <p className="text-primary-800 mt-6">{t("description")}</p>
      </div>
      <Button variant="dark" size="lg" asChild>
        <Link href="/request-property">{t("cta")}</Link>
      </Button>
    </div>
  );
}
