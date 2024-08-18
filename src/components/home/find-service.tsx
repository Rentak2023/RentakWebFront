"use client";

import { SquareCheckBigIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { Link } from "@/navigation";

type Question = {
  title: string;
  arTitle: string;
  answers?: Array<{ label: string; arLabel: string; question?: Question }>;
  services?: Array<Service>;
};

type Service = {
  title: string;
  arTitle: string;
  href: string;
};

const questions: Question = {
  title: "Are you a property Owner, a Tenant or a Broker?",
  arTitle: "هل أنت مالك، مستأجر، أو بروكر؟",
  answers: [
    {
      label: "Owner",
      arLabel: "مالك",
      question: {
        title: "Are you already renting your property or want to rent yours?",
        arTitle: "هل تقوم بتأجير عقارك حاليا أم ترغب في تأجيره؟",
        answers: [
          {
            label: "Renting Already",
            arLabel: "تقوم بالتأجير حاليا",
            question: {
              title: "Services",
              arTitle: "الخدمات",
              services: [
                {
                  title: "Rent Collection",
                  arTitle: "تحصيل الإيجار",
                  href: "/rent-collection",
                },
                {
                  title: "Finance Annual Maintenance",
                  arTitle: "تقسيط الصيانة السنوية",
                  href: "/maintenance-payment",
                },
                {
                  title: "Evaluate My Property",
                  arTitle: "تقييم الوحدة",
                  href: "/",
                },
              ],
            },
          },
          {
            label: "Want to Rent My Property",
            arLabel: "رغب في تأجير عقارك",
            question: {
              title: "Services",
              arTitle: "الخدمات",
              services: [
                {
                  title: "Create Rent Contract",
                  arTitle: "إنشاء عقد ايجار",
                  href: "/contract",
                },
                {
                  title: "Finance Annual Maintenance",
                  arTitle: "تمويل الصيانة السنوية",
                  href: "/maintenance-payment",
                },
                {
                  title: "Evaluate My Property",
                  arTitle: "تقييم عقاري",
                  href: "/",
                },
                {
                  title: "Rent My Unit",
                  arTitle: "تأجير وحدتي",
                  href: "/",
                },
              ],
            },
          },
        ],
      },
    },
    {
      label: "Tenant",
      arLabel: "مستأجر",
      question: {
        title:
          "Are you looking for a property to rent or need help with your current rental?",
        arTitle:
          "هل تبحث عن عقار للإيجار أم تحتاج إلى مساعدة في إيجارك الحالي؟",
        answers: [
          {
            label: "Looking for a Property",
            arLabel: "تبحث عن عقار",
            question: {
              title: "Services",
              arTitle: "الخدمات",
              services: [
                {
                  title: "Listing Platform",
                  arTitle: "منصة القوائم",
                  href: "/units",
                },
                {
                  title: "Request Property",
                  arTitle: "طلب عقار",
                  href: "/",
                },
              ],
            },
          },
          {
            label: "Need Help with Current Rental",
            arLabel: "تحتاج إلى مساعدة في إيجارك الحالي",
            question: {
              title: "Services",
              arTitle: "الخدمات",
              services: [
                {
                  title: "Pay Rent",
                  arTitle: "دفع الإيجار",
                  href: "/rent-payment",
                },
                {
                  title: "Pay Maintenance",
                  arTitle: "دفع الصيانة",
                  href: "/maintenance-payment",
                },
                // {
                //   // TODO: disable this option
                //   title: "Bill Payments",
                // },
                // // TODO: disable this option
                // {
                //   title: "Order Facility Management Service",
                // },
              ],
            },
          },
        ],
      },
    },
    {
      label: "Broker",
      arLabel: "بروكر",
      question: {
        title:
          "Are you looking for Exclusive Listings or facilitate your rental deal?",
        arTitle: "هل تبحث عن قوائم حصرية أم تسهيل صفقة الإيجار؟",
        answers: [
          {
            label: "Looking for Exclusive Listings",
            arLabel: "تبحث عن قوائم حصرية",
            question: {
              title: "Services",
              arTitle: "الخدمات",
              services: [
                {
                  title: "Access Exclusive Listings",
                  arTitle: "الوصول إلى القوائم الحصرية",
                  href: "/",
                },
                {
                  title: "Promote Properties",
                  arTitle: "ترويج العقارات",
                  href: "/",
                },
                {
                  title: "Request Property",
                  arTitle: "طلب عقار",
                  href: "/",
                },
              ],
            },
          },
          {
            label: "Facilitate your rental deal",
            arLabel: "تسهيل صفقة الإيجار",
            question: {
              title: "Services",
              arTitle: "الخدمات",
              services: [
                {
                  title: "Construct Rent Contract",
                  arTitle: "إنشاء عقد ايجار",
                  href: "/contract",
                },
                {
                  title: "Finance Brokerage Commission",
                  arTitle: "تمويل عمولة الوساطة",
                  href: "/",
                },
              ],
            },
          },
        ],
      },
    },
  ],
};

export function FindService() {
  const [currentQuestion, setCurrentQuestion] = useState(questions);
  const t = useTranslations("find-service");
  const locale = useLocale();

  return (
    <div className="mb-12 flex-1 rounded-3xl bg-white/70 p-6 text-center lg:mb-0">
      <h3 className="text-xl font-medium capitalize text-slate-800">
        {t.rich("title", {
          bold: (text) => <span className="font-bold">{text}</span>,
        })}
      </h3>
      <h2 className="mt-4 text-2xl font-semibold text-primary-800">
        {locale === "en" ? currentQuestion.title : currentQuestion.arTitle}
      </h2>
      <div className="mt-12 flex flex-col gap-3">
        {currentQuestion.answers?.map((answer, index) => (
          <button
            onClick={() => {
              if (answer.question) {
                setCurrentQuestion(answer.question);
              }
            }}
            className="flex flex-row items-center justify-start gap-2 rounded-3xl bg-white p-4 text-slate-700 transition duration-300 hover:bg-primary-800/80 hover:text-white"
            key={answer.label}
          >
            <span className="flex size-8 items-center justify-center rounded-full border border-slate-700 bg-white p-2 leading-8 text-slate-700">
              {String.fromCodePoint(65 + index)}
            </span>
            <span className="capitalize">
              {locale === "en" ? answer.label : answer.arLabel}
            </span>
          </button>
        ))}
        {currentQuestion.services?.map((answer) => (
          <Link
            key={answer.title}
            className="flex items-center justify-start gap-2 rounded-3xl bg-white p-4 capitalize text-slate-700 transition duration-300 hover:bg-primary-800/80 hover:text-white"
            href={answer.href}
          >
            <SquareCheckBigIcon className="size-6" />
            {locale === "en" ? answer.title : answer.arTitle}
          </Link>
        ))}
      </div>
    </div>
  );
}
