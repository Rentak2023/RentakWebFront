import Image from "next/image";
import { useTranslations } from "next-intl";

import headerBackground from "@/app/[locale]/assets/images/header-background.png";

import { Button } from "../ui/button";

export function Header() {
  const t = useTranslations("header");
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
      <div className="absolute inset-0 -z-10 bg-[#161C2D]/50" />
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 lg:px-8">
        <div className="max-w-lg py-32 sm:py-48 lg:py-48">
          <div className="text-start">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl sm:leading-[70px]">
              {t.rich("title", {
                wbr: () => <wbr />,
              })}
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              {t("subtitle")}
            </p>
            <div className="mt-14 flex items-center justify-start gap-x-6">
              <Button asChild size="lg">
                <a href="#">{t("cta")}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
