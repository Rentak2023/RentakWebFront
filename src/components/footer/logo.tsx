import Image from "next/image";
import { useTranslations } from "next-intl";

import logo from "@/app/[locale]/assets/images/Logo.png";
import { Link } from "@/navigation";

const Logo = () => {
  const t = useTranslations("footer");

  return (
    <div>
      <Link href="/">
        <Image src={logo} alt="logo" width={98} height={28} />
      </Link>
      <p className="mt-6 text-slate-500">{t("description")}</p>
    </div>
  );
};

export default Logo;
