import { type Metadata } from "next";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import contractImage from "@/app/[locale]/assets/images/contract.gif";
import Container from "@/components/ui/container";
import { generateAlternatesLinks } from "@/lib/utils";

import ContractForm from "./contract-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contract.meta");

  return {
    alternates: generateAlternatesLinks("/contract"),
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

function Contract() {
  const t = useTranslations("contract");

  return (
    <Container className="pt-20 xl:max-w-5xl">
      <div className="grid md:grid-cols-3">
        <div className="col-span-2 flex flex-col justify-center">
          <h3 className="mt-10 text-7xl font-medium text-slate-800">
            {t("title")}
          </h3>
          <p className="mt-6 max-w-lg text-2xl text-slate-600">
            {t("description")}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Image src={contractImage} alt="" />
        </div>
      </div>
      <ContractForm />
    </Container>
  );
}

export default Contract;
