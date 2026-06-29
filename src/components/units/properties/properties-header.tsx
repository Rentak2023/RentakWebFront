import { useTranslations } from "next-intl";
import { KeyRound, CreditCard, BadgePercent } from "lucide-react";

function PropertiesHeader() {
  const t = useTranslations("units.whyRent");

  const cards = [
    {
      icon: <KeyRound className="size-7 text-primary-800" />,
      text: t("moveIn"),
    },
    {
      icon: <CreditCard className="size-7 text-primary-800" />,
      text: t("paymentMethods"),
    },
    {
      icon: <BadgePercent className="size-7 text-primary-800" />,
      text: t("installments"),
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-10 text-center sm:px-6 lg:px-8">
      <div className="relative inline-flex items-center justify-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider text-primary-800 uppercase bg-primary-50 rounded-full mb-4">
        {t("badge")}
      </div>
      
      <h1 className="mx-auto max-w-4xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:leading-tight">
        {t("title")}
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10 max-w-5xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            className="group relative flex flex-col items-center justify-center text-center p-6 bg-white border border-slate-250/70 rounded-2xl shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-center size-14 rounded-full bg-primary-50 group-hover:bg-primary-100 transition-colors duration-300 mb-4">
              {card.icon}
            </div>
            <p className="whitespace-pre-line text-base font-semibold text-sky-950 leading-relaxed max-w-xs">
              {card.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertiesHeader;
