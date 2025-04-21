import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

export default function MaximizeRent() {
  const t = useTranslations("landlord.summary");

  return (
    <section
      className="mt-12 flex flex-col items-center justify-between rounded-ee-[480px] bg-black px-6 pb-16 text-white md:flex-row md:px-24 md:pb-32"
      aria-labelledby="maximize-rent-heading"
    >
      <div className="flex max-w-3xl flex-1 flex-col items-start justify-center">
        <h2
          id="maximize-rent-heading"
          className="text-4xl font-bold md:text-6xl"
        >
          {t("title")}
        </h2>
        <p className="mt-8 text-lg md:text-2xl">{t("subtitle")}</p>
        <div className="mt-12 flex flex-col gap-6 sm:flex-row">
          <Button
            className="bg-orange-500 text-white hover:bg-orange-500/90 focus-visible:ring-orange-500/50"
            size="xl"
          >
            {t("get-instant-offer")}
          </Button>
          <Button
            className="border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600 focus-visible:ring-orange-500/50"
            size="xl"
            variant="outline"
          >
            {t("list-unit")}
          </Button>
        </div>
      </div>
      <div className="mt-12 flex min-w-[320px] max-w-lg flex-1 items-center justify-end md:mt-0">
        <Image
          src="https://plus.unsplash.com/premium_photo-1661761197559-58493b11151b"
          alt="Landlord handing over keys to tenant"
          className="overflow-hidden rounded-ee-[320px] object-cover"
          width={324}
          height={490}
        />
      </div>
    </section>
  );
}
