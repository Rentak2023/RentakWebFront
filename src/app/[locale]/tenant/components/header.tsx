import { Image } from "@unpic/react/nextjs";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Link } from "@/i18n/routing";
import URLS from "@/shared/urls";

import headerBackground from "./header-background.jpg";

export default function Header() {
  const t = useTranslations("tenant.header");
  return (
    <div className="relative isolate min-h-dvh overflow-hidden pt-16">
      <Image
        src={headerBackground}
        className="absolute inset-0 -z-20 size-full"
        background={headerBackground.blurDataURL}
        alt=""
        layout="fullWidth"
        priority
      />
      <div className="absolute inset-0 -z-10 bg-[#181A20]/60" />
      <Container className="flex min-h-dvh flex-col items-center justify-start gap-12 lg:flex-row lg:gap-0">
        <div className="max-w-[44rem]">
          <h1 className="text-pretty text-2xl sm:text-6xl font-bold tracking-tight text-white whitespace-nowrap">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg/8 text-slate-300">{t("subtitle")}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button size="xl" className="bg-primary-600 hover:bg-primary-600/90" asChild>
              <Link href={URLS.rentPayment}>{t("cta_pay_now")}</Link>
            </Button>
            <Button size="xl" className="bg-primary-600 hover:bg-primary-600/90" asChild>
              <Link href={URLS.units}>{t("cta_browse_listing")}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
