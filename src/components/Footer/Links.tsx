import Link from "next/link";
import { useTranslations } from "next-intl";

import {
  LocationIcon,
  MailOutlineIcon,
  PhoneIcon,
} from "@/app/[locale]/assets/svgs";
import URLS from "@/shared/urls";

const Links = () => {
  const t = useTranslations("footer");
  const lists = [
    {
      id: "pages",
      title: trans("pages"),
      links: [
        {
          id: "contact-us",
          url: URLS.contactUs,
          text: trans("contactUs"),
          icon: null,
        },
        {
          id: "faq",
          url: URLS.faq,
          text: trans("faq"),
          icon: null,
        },
      ],
    },
    {
      id: "services",
      title: trans("services"),
      links: [
        {
          id: "rent-payment",
          url: URLS.rentPayment,
          text: trans("rentPayment"),
          icon: null,
        },
        {
          id: "rent-collection",
          url: URLS.rentCollection,
          text: trans("rentCollection"),
          icon: null,
        },
        {
          id: "units",
          url: URLS.units,
          text: trans("units"),
          icon: null,
        },
      ],
    },
    {
      id: "contact",
      title: trans("contact"),
      links: [
        {
          id: "address",
          url: URLS.address,
          text: "Smart Village, Linx Business Park, B115, Giza, Egypt.",
          icon: <LocationIcon color="#737373" />,
        },
        {
          id: "mail-to",
          url: URLS.mailTo,
          text: "Info@rent-ak.com",
          icon: <MailOutlineIcon />,
        },
        {
          id: "tel",
          url: URLS.tel,
          text: "(+20) 111111 - 1541",
          icon: <PhoneIcon />,
        },
      ],
    },
  ];
  return lists.map((list, index) => (
    <div
      key={list.id}
      className={`md:col-span-4 ${index === lists.length - 1 ? "lg:col-span-3" : "lg:col-span-2"}`}
    >
      <h5 className="font-semibold tracking-[1px] text-primary-shade-3">
        {list.title}
      </h5>
      <ul className="footer-list mt-6 list-none">
        {list.links.map((link) => (
          <li key={link.id} className="mb-3">
            <Link
              href={link.url}
              className="flex items-center gap-2 text-[#737373] duration-500 ease-in-out hover:text-slate-400"
            >
              {link.icon ? link.icon : null}
              <span style={{ direction: link.icon ? "ltr" : undefined }}>
                {link.text}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ));
};

export default Links;
