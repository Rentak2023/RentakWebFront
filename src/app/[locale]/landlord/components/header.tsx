import { Image } from "@unpic/react/nextjs";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Link } from "@/i18n/routing";

import headerBackground from "./header-background.png";

export default function Header() {
  const t = useTranslations("landlord.header");

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
          <h1 className="text-pretty text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg/8 text-slate-300">{t("subtitle")}</p>
          {/* TODO: UPDATE CTA link */}
          {/* <Button
            size="xl"
            className="bg-primary-600 hover:bg-primary-600/90 mt-10"
            asChild
          >
            <Link href="/">{t("cta")}</Link>
          </Button> */}
        </div>
      </Container>
    </div>
  );
}
