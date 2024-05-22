import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import logo from "@/app/[locale]/assets/images/Logo.png";

const Logo = () => {
  const t = useTranslations("footer");

  return (
    <div className="md:col-span-12 lg:col-span-4">
      <Link href="#" className="text-[22px] focus:outline-none">
        <Image src={logo} alt="logo" width={98} height={28} />
      </Link>
      <p className="mt-6 text-[#737373]">{t("description")}</p>
    </div>
  );
};

export default Logo;
