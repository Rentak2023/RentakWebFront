import Image from "next/image";
import { useTranslations } from "next-intl";

import headerBackground from "./header-background.jpg";

export default function Header() {
  const t = useTranslations("tenant.header");
  return (
    <div className="bg-white">
      <div className="bg-linear-to-b from-primary-100/20 relative isolate overflow-hidden pt-24">
        <div className="container mx-auto items-center justify-between px-4 pt-10 sm:px-6 lg:flex lg:flex-row lg:gap-x-8 lg:px-8 xl:max-w-7xl">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-xl">
                <h1 className="text-primary-800 mt-10 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
                  {t("title")}
                </h1>
                <p className="mt-6 text-lg text-slate-700">{t("subtitle")}</p>
              </div>
            </div>
          </div>
          <div className="relative mx-auto mt-20 sm:mt-24 md:max-w-lg lg:mx-0 lg:mt-0 lg:w-screen">
            <Image
              src={headerBackground}
              className="w-full overflow-hidden rounded-xl"
              alt=""
              width={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
