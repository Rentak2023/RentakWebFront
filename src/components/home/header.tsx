import Image from "next/image";
import { getTranslations } from "next-intl/server";

import headerBackground from "@/app/[locale]/assets/images/header-background.png";

import Container from "../ui/container";
import { FindService } from "./find-service";

export async function Header() {
  const t = await getTranslations("header");

  return (
    <div className="relative min-h-dvh overflow-hidden pt-14">
      <Image
        src={headerBackground}
        className="absolute inset-0 -z-20 size-full object-cover"
        placeholder="blur"
        alt=""
        fill
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-10 bg-slate-900/50" />
      <Container className="flex min-h-dvh flex-col items-center justify-between gap-12 lg:flex-row lg:gap-0">
        <div className="pt-12 lg:max-w-md lg:py-48 xl:max-w-[44rem]">
          <div className="text-start">
            <h1 className="sm:text-6xl/18 text-balance text-4xl font-bold tracking-tight text-white">
              {t("title")}
            </h1>
            <p className="mt-4 text-balance text-lg/8 text-slate-300">
              {t("subtitle")}
            </p>
            {/* <div className="mt-14 flex items-center justify-start gap-x-6">
              <Button asChild size="lg">
                <Link href="/units">{t("cta")}</Link>
              </Button>
            </div> */}
          </div>
        </div>
        <FindService />
      </Container>
    </div>
  );
}
