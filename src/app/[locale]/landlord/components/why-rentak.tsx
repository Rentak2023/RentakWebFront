import { useTranslations } from "next-intl";

export default function WhyRentak() {
  const t = useTranslations("landlord.why-rentak");
  return (
    <div className="mt-32">
      <h2 className="text-primary-900 text-center text-4xl font-semibold capitalize leading-7 tracking-tight">
        {t("title")}
      </h2>

      <p className="mx-auto mt-8 max-w-5xl px-4 text-center text-2xl text-slate-600">
        {t("subtitle")}
      </p>
    </div>
  );
}
