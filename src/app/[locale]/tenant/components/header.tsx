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
      <Container className="flex min-h-dvh flex-col items-center justify-center pb-12 pt-24 sm:pt-28 lg:flex-row lg:justify-start lg:py-0">
        <div className="w-full max-w-[44rem]">
          <h1 className="text-pretty text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-4 whitespace-pre-line text-balance text-xl text-slate-200">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              size="xl"
              className="bg-primary-600 hover:bg-primary-600/90"
              asChild
            >
              <Link href={URLS.rentPayment}>{t("cta_pay_now")}</Link>
            </Button>
            <Button
              size="xl"
              className="bg-primary-600 hover:bg-primary-600/90"
              asChild
            >
              <Link href={URLS.units}>{t("cta_browse_listing")}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
