import Image from "next/image";
import { getTranslations } from "next-intl/server";

import logo from "@/app/[locale]/assets/images/logo-blue.png";
import { Link } from "@/navigation";

async function Logo() {
  const t = await getTranslations("footer");

  return (
    <div>
      <Link href="/">
        <Image src={logo} alt="logo" height={28} />
      </Link>
      <p className="mt-6 text-slate-500">{t("description")}</p>
    </div>
  );
}

export default Logo;
