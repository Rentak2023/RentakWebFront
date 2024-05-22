import Link from "next/link";
import { useTranslations } from "next-intl";

import FacebookIcon from "@/app/[locale]/assets/svgs/facebook-icon";
import InstagramIcon from "@/app/[locale]/assets/svgs/instagram-icon";
import LinkedinIcon from "@/app/[locale]/assets/svgs/linkedin-icon";
import WhatsappIcon from "@/app/[locale]/assets/svgs/whatsapp-icon";
import URLS from "@/shared/urls";

const Copyright = () => {
  const t = useTranslations("footer");

  const socialMediaLinks = [
    {
      url: URLS.facebook,
      icon: <FacebookIcon />,
    },
    {
      url: URLS.whatsapp,
      icon: <WhatsappIcon />,
    },
    {
      url: URLS.linkedin,
      icon: <LinkedinIcon />,
    },
    {
      url: URLS.instagram,
      icon: <InstagramIcon />,
    },
  ];

  return (
    <div className="border-t border-[#BBBBBB] px-0 py-[30px]">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div className="text-center md:text-start">
            <p className="mb-0 text-[#737373]">
              {`©${new Date().getFullYear()} ${t("copyright")}.`}
            </p>
          </div>

          <ul className="list-none text-center md:text-end">
            {socialMediaLinks.map((link) => (
              <li key={link.url} className="ms-1 inline">
                <Link
                  href={link.url}
                  target="_blank"
                  className="btn btn-icon btn-sm rounded-md text-gray-400 hover:border-secondary hover:bg-primary"
                >
                  {link.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Copyright;
