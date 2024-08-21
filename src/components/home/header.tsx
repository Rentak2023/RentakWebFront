import Image from "next/image";
import { getTranslations } from "next-intl/server";

import headerBackground from "@/app/[locale]/assets/images/header-background.png";
import { Link } from "@/navigation";

import { Button } from "../ui/button";
import { FindService } from "./find-service";

export async function Header() {
  const t = await getTranslations("header");

  return (
    <div className="relative min-h-screen overflow-hidden pt-14">
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
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-between gap-12 px-6 lg:flex-row lg:gap-0 lg:px-8">
        <div className="pt-12 lg:max-w-md lg:py-48 xl:max-w-[44rem]">
          <div className="text-start">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-6xl sm:leading-[70px]">
              {t("title")}
            </h1>
            <p className="mt-4 text-balance text-lg leading-8 text-slate-300">
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
      </div>
    </div>
  );
}
