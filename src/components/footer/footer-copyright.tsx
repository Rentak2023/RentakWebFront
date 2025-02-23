import { getTranslations } from "next-intl/server";

import FacebookIcon from "@/app/[locale]/assets/svgs/facebook-icon";
import InstagramIcon from "@/app/[locale]/assets/svgs/instagram-icon";
import LinkedinIcon from "@/app/[locale]/assets/svgs/linkedin-icon";
import WhatsappIcon from "@/app/[locale]/assets/svgs/whatsapp-icon";
import URLS from "@/shared/urls";

import { Button } from "../ui/button";
import Container from "../ui/container";

async function Copyright() {
  const t = await getTranslations("footer");

  const socialMediaLinks = [
    {
      url: URLS.facebook,
      icon: <FacebookIcon className="size-5 text-slate-800" />,
    },
    {
      url: URLS.whatsapp,
      icon: <WhatsappIcon className="size-5 text-slate-800" />,
    },
    {
      url: URLS.linkedin,
      icon: <LinkedinIcon className="size-5 text-slate-800" />,
    },
    {
      url: URLS.instagram,
      icon: <InstagramIcon className="size-5 text-slate-800" />,
    },
  ];

  return (
    <div className="border-t border-t-slate-300 px-0 py-8">
      <Container>
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div className="text-center md:text-start">
            <p className="mb-0 text-slate-700">
              {`©${new Date().getFullYear()} ${t("copyright")}.`}
            </p>
          </div>

          <ul className="list-none text-center md:text-end">
            {socialMediaLinks.map((link) => (
              <li key={link.url} className="ms-1 inline">
                <Button variant="ghost" size="icon" asChild>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.icon}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}

export default Copyright;
