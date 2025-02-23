import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Link } from "@/i18n/routing";

import img01 from "./images/01.jpg";
import img02 from "./images/02.jpg";
import img03 from "./images/03.jpg";
import img04 from "./images/04.jpg";

export default function Finishing() {
  const t = useTranslations("landlord.finishing");

  return (
    <Container className="mt-28 overflow-hidden lg:flex">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
        <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
          <h2 className="text-primary-900 text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-6 text-base leading-7 text-slate-600">
            {t("subtitle")}
          </p>
          <Button variant="dark" size="lg" className="mt-10" asChild>
            <Link href="/finish-property">{t("cta")}</Link>
          </Button>
        </div>
        <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
          <div className="w-0 flex-auto lg:ms-auto lg:w-auto lg:flex-none lg:self-end">
            <Image
              alt=""
              src={img01}
              className="aspect-7/5 w-[37rem] max-w-none rounded-2xl bg-slate-50 object-cover"
            />
          </div>
          <div className="contents lg:col-span-2 lg:col-end-2 lg:ms-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
            <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
              <Image
                alt=""
                src={img02}
                className="aspect-4/3 w-96 max-w-none flex-none rounded-2xl bg-slate-50 object-cover"
              />
            </div>
            <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
              <Image
                alt=""
                src={img03}
                className="aspect-7/5 w-[37rem] max-w-none flex-none rounded-2xl bg-slate-50 object-cover"
              />
            </div>
            <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
              <Image
                alt=""
                src={img04}
                className="aspect-square w-96 max-w-none rounded-2xl bg-slate-50 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
