"use client";

import { MoveLeftIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { Link } from "@/navigation";

type Question = {
  title: string;
  arTitle: string;
  answers?: Array<Answer>;
  services?: Array<Service>;
};

type Answer = {
  title: string;
  arTitle: string;
  question?: Question;
};

type Service = {
  title: string;
  arTitle: string;
  href: string;
};

const isService = (item: Answer | Service): item is Service => "href" in item;

const questions: Question = {
  title: "Are you a property Owner, Tenant or Broker?",
  arTitle: "هل أنت مالك، مستأجر، أو بروكر؟",
  answers: [
    {
      title: "Owner",
      arTitle: "مالك",
      question: {
        title: "Are you already renting your property or want to rent yours?",
        arTitle: "هل تقوم بتأجير عقارك حاليا أم ترغب في تأجيره؟",
        answers: [
          {
            title: "Renting Already",
            arTitle: "تقوم بالتأجير حاليا",
            question: {
              title: "Your Best-Match Rental Solutions",
              arTitle: "أفضل حلول إيجار تناسب احتياجاتك",
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
                  href: "/evaluate-property",
                },
              ],
            },
          },
          {
            title: "Want to Rent My Property",
            arTitle: "رغب في تأجير عقارك",
            question: {
              title: "Your Best-Match Rental Solutions",
              arTitle: "أفضل حلول إيجار تناسب احتياجاتك",
              services: [
                {
                  title: "Rent My Unit",
                  arTitle: "تأجير وحدتي",
                  href: "/rent-management",
                },
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
                  href: "/evaluate-property",
                },
              ],
            },
          },
        ],
      },
    },
    {
      title: "Tenant",
      arTitle: "مستأجر",
      question: {
        title:
          "Are you looking for a property to rent or need help with your current rental?",
        arTitle:
          "هل تبحث عن عقار للإيجار أم تحتاج إلى مساعدة في إيجارك الحالي؟",
        answers: [
          {
            title: "Looking for a Property",
            arTitle: "تبحث عن عقار",
            question: {
              title: "Your Best-Match Rental Solutions",
              arTitle: "أفضل حلول إيجار تناسب احتياجاتك",
              services: [
                {
                  title: "Listing Platform",
                  arTitle: "منصة القوائم",
                  href: "/units",
                },
                {
                  title: "Request Property",
                  arTitle: "طلب عقار",
                  href: "/request-property",
                },
              ],
            },
          },
          // {
          //   label: "Pay My Rent",
          //   arLabel: "تحتاج إلى مساعدة في إيجارك الحالي",
          //   question: {
          //     title: "Your Best-Match Rental Solutions",
          //     arTitle: "أفضل حلول إيجار تناسب احتياجاتك",
          //     services: [
          //       {
          //         title: "Pay Rent",
          //         arTitle: "دفع الإيجار",
          //         href: "/rent-payment",
          //       },
          //       {
          //         title: "Pay Maintenance",
          //         arTitle: "دفع الصيانة",
          //         href: "/maintenance-payment",
          //       },
          //       // {
          //       //   // TODO: disable this option
          //       //   title: "Bill Payments",
          //       // },
          //       // // TODO: disable this option
          //       // {
          //       //   title: "Order Facility Management Service",
          //       // },
          //     ],
          //   },
          // },
        ],
        services: [
          {
            title: "Pay Rent",
            arTitle: "دفع الإيجار",
            href: "/rent-payment",
          },
        ],
      },
    },
    {
      title: "Broker",
      arTitle: "بروكر",
      question: {
        title:
          "Are you looking for Exclusive Listings or facilitate your rental deal?",
        arTitle: "هل تبحث عن قوائم حصرية أم تسهيل صفقة الإيجار؟",
        answers: [
          {
            title: "Looking for Exclusive Listings",
            arTitle: "تبحث عن قوائم حصرية",
            question: {
              title: "Your Best-Match Rental Solutions",
              arTitle: "أفضل حلول إيجار تناسب احتياجاتك",
              services: [
                {
                  title: "Access Exclusive Listings",
                  arTitle: "الوصول إلى القوائم الحصرية",
                  href: "/units",
                },
                {
                  title: "Promote Properties",
                  arTitle: "ترويج العقارات",
                  href: "/promote-properties",
                },
                {
                  title: "Request Property",
                  arTitle: "طلب عقار",
                  href: "/request-property",
                },
              ],
            },
          },
          {
            title: "Facilitate your rental deal",
            arTitle: "تسهيل صفقة الإيجار",
            question: {
              title: "Your Best-Match Rental Solutions",
              arTitle: "أفضل حلول إيجار تناسب احتياجاتك",
              services: [
                {
                  title: "Construct Rent Contract",
                  arTitle: "إنشاء عقد ايجار",
                  href: "/contract",
                },
                {
                  title: "Finance Brokerage Commission",
                  arTitle: "تمويل عمولة الوساطة",
                  href: "/brokerage-commission",
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
  const [previousQuestion, setPreviousQuestion] = useState<Question>();
  const t = useTranslations("find-service");
  const locale = useLocale();

  const options = [
    ...(currentQuestion.answers ?? []),
    ...(currentQuestion.services ?? []),
  ];

  return (
    <div className="mb-12 flex-1 rounded-3xl bg-white/70 p-6 text-center lg:mb-0 lg:max-w-[26rem] xl:max-w-md">
      <h3 className="text-sm capitalize text-slate-800">
        {t.rich("title", {
          bold: (text) => <span className="font-semibold">{text}</span>,
        })}
      </h3>
      <h2 className="mt-2 text-2xl font-semibold text-primary-900">
        {locale === "en" ? currentQuestion.title : currentQuestion.arTitle}
      </h2>
      <div className="mt-6 flex flex-col gap-3">
        {options.map((option, index) =>
          isService(option) ? (
            <Link
              key={option.title}
              className="flex flex-row items-center justify-start gap-2 rounded-3xl bg-white p-4 text-slate-700 transition duration-300 hover:bg-primary-800/80 hover:text-white"
              href={option.href}
            >
              <span className="flex size-8 items-center justify-center rounded-full border border-slate-700 bg-white p-2 leading-8 text-slate-700">
                {String.fromCodePoint(65 + index)}
              </span>
              <span className="capitalize">
                {locale === "en" ? option.title : option.arTitle}
              </span>
            </Link>
          ) : (
            <button
              onClick={() => {
                if (option.question) {
                  setPreviousQuestion(currentQuestion);
                  setCurrentQuestion(option.question);
                }
              }}
              className="flex flex-row items-center justify-start gap-2 rounded-3xl bg-white p-4 text-slate-700 transition duration-300 hover:bg-primary-800/80 hover:text-white"
              key={option.title}
            >
              <span className="flex size-8 items-center justify-center rounded-full border border-slate-700 bg-white p-2 leading-8 text-slate-700">
                {String.fromCodePoint(65 + index)}
              </span>
              <span className="capitalize">
                {locale === "en" ? option.title : option.arTitle}
              </span>
            </button>
          ),
        )}
      </div>
      <button
        className="ml-4 mt-6 flex items-center justify-center gap-2 text-slate-800"
        onClick={() => {
          setCurrentQuestion(previousQuestion ?? questions);
          setPreviousQuestion(questions);
        }}
      >
        <MoveLeftIcon className="size-6 rounded-full" />
        <span className="text-sm">Previous</span>
      </button>
    </div>
  );
}
