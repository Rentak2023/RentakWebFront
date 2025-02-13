import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export default function PropertyRequest() {
  const t = useTranslations("tenant.property-request");
  return (
    <div className="mx-auto mt-32 flex max-w-7xl flex-col items-center justify-between gap-y-6 px-4 text-center sm:px-6 lg:px-8">
      <div>
        <p className="text-primary-900 text-lg font-medium">{t("question")}</p>
        <h2 className="text-primary-800 mt-4 text-5xl font-semibold tracking-tight">
          {t("title")}
        </h2>
        <p className="text-primary-800 mt-6 max-w-lg text-xl">
          {t("description")}
        </p>
      </div>
      <Button size="lg" asChild>
        <Link href="/request-property">{t("cta")}</Link>
      </Button>
    </div>
  );
}
