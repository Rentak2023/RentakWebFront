import { getTranslations } from "next-intl/server";

import LocationIcon from "@/app/[locale]/assets/svgs/location-icon";
import MailOutlineIcon from "@/app/[locale]/assets/svgs/mail-outline-icon";
import PhoneIcon from "@/app/[locale]/assets/svgs/phone-icon";
import { Link } from "@/i18n/routing";
import URLS from "@/shared/urls";

async function Links() {
  const t = await getTranslations("footer");
  const lists = [
    {
      id: "pages",
      title: t("pages"),
      links: [
        {
          id: "contact-us",
          url: URLS.contactUs,
          text: t("contactUs"),
          icon: null,
        },
        {
          id: "privacy-policy",
          url: URLS.privacyPolicy,
          text: t("privacyPolicy"),
          icon: null,
        },
        {
          id: "refund-policy",
          url: URLS.refundPolicy,
          text: t("refundPolicy"),
          icon: null,
        },
        {
          id: "faq",
          url: URLS.faq,
          text: t("faq"),
          icon: null,
        },
      ],
    },
    {
      id: "services",
      title: t("services"),
      links: [
        {
          id: "rent-payment",
          url: URLS.rentPayment,
          text: t("rentPayment"),
          icon: null,
        },
        {
          id: "rent-collection",
          url: URLS.rentCollection,
          text: t("rentCollection"),
          icon: null,
        },
        {
          id: "units",
          url: URLS.units,
          text: t("units"),
          icon: null,
        },
      ],
    },
    {
      id: "contact",
      title: t("contact"),
      links: [
        {
          id: "address",
          url: URLS.address,
          text: "Smart Village, Linx Business Park, B115, Giza, Egypt.",
          icon: <LocationIcon className="size-6" />,
        },
        {
          id: "mail-to",
          url: URLS.mailTo,
          text: "Info@rent-ak.com",
          icon: <MailOutlineIcon className="size-6" />,
        },
        {
          id: "tel",
          url: URLS.tel,
          text: "(+20) 111111 - 1541",
          icon: <PhoneIcon className="size-6" />,
        },
      ],
    },
  ];
  return lists.map((list) => (
    <div key={list.id}>
      <h4 className="text-primary-800 font-semibold">{list.title}</h4>
      <ul className="mt-6 list-none">
        {list.links.map((link) => (
          <li key={link.id} className="mb-3">
            <Link
              href={link.url}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-700"
            >
              {link.icon ? (
                <span className="flex size-5 items-center justify-center">
                  {link.icon}
                </span>
              ) : null}
              <span dir="auto">{link.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ));
}

export default Links;
