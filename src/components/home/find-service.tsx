"use client";

import { SquareCheckBigIcon } from "lucide-react";
import { useState } from "react";

type Question = {
  title: string;
  answers?: Array<{ label: string; question?: Question }>;
  services?: Array<Service>;
};

type Service = {
  title: string;
  description: string;
  // href: string;
};

const questions: Question = {
  title: "Are you a property Owner, a Tenant or a Broker?",
  answers: [
    {
      label: "Owner",
      question: {
        title: "Are you already renting your property or want to rent yours?",
        answers: [
          {
            label: "Renting Already",
            question: {
              title: "Services",
              services: [
                {
                  title: "Rent Collection",
                  description:
                    "Rentak can collect your rent efficiently and ensure timely payments.",
                },
                {
                  title: "Finance Maintenance",
                  description:
                    "Manage or finance your property’s annual maintenance fees to the developer.",
                },
                {
                  title: "Evaluate Property",
                  description:
                    "Get a professional evaluation of your property’s  rental value.",
                },
              ],
            },
          },
          {
            label: "Want to Rent My Property",
            question: {
              title: "Services",
              services: [
                {
                  title: "Rent Contract",
                  description:
                    "Create a legally compliant rental contract for your property.",
                },
                {
                  title: "Finance Maintenance",
                  description:
                    "Pay or finance your property’s annual maintenance fees.",
                },
                {
                  title: "Evaluate Property",
                  description:
                    "Get a professional evaluation of your property’s rental value.",
                },
                {
                  title: "Rent Unit",
                  description: `Choose from the following options to rent your property:
I. Brokerage: Use Rentak's brokerage services to find suitable
tenants.
II. Basic Rental Management: Rentak will manage the rental
process, including tenant screening and rent collection.
III. Guaranteed Rental Management: Ensure stable rental
income with Rentak's guaranteed rent management service.
IV. Instant Rent: Rentak will rent your property instantly from
you.`,
                },
              ],
            },
          },
        ],
      },
    },
    {
      label: "Tenant",
      question: {
        title:
          "Are you looking for a property to rent or need help with your current rental?",
        answers: [
          {
            label: "Looking for a Property",
            question: {
              title: "Services",
              services: [
                {
                  title: "Listing Platform",
                  description:
                    "Browse a wide range of verified rental properties.",
                },
                {
                  title: "Request Property",
                  description:
                    "Submit your preferences and let Rentak match you  with suitable listings.",
                },
              ],
            },
          },
          {
            label: "Need Help with Current Rental",
            question: {
              title: "Services",
              services: [
                {
                  title: "Pay Rent",
                  description:
                    "Conveniently pay your rent through multiple payment methods.",
                },
                {
                  title: "Pay Maintenance",
                  description:
                    "Handle maintenance payments directly through Rentak.",
                },
                // {
                //   // TODO: disable this option
                //   title: "Bill Payments",
                //   description:
                //     "Manage and pay utility and service bills seamlessly.",
                // },
                // // TODO: disable this option
                // {
                //   title: "Order Facility Management Service",
                //   description:
                //     "Request professional maintenance services for your property.",
                // },
              ],
            },
          },
        ],
      },
    },
    {
      label: "Broker",
      question: {
        title:
          "Are you looking for Exclusive Listings or faciliate you rental deal?",
        answers: [
          {
            label: "Looking for Exclusive Listings",
            question: {
              title: "Services",
              services: [
                {
                  title: "Access Exclusive Listings",
                  description:
                    "Gain access to exclusive property listings available only through Rentak.",
                },
                {
                  title: "Promote Properties",
                  description:
                    "Use Rentak’s marketing tools to promote properties effectively.",
                },
                {
                  title: "Request Property",
                  description:
                    "Submit your preferences and let Rentak match you with suitable listings.",
                },
              ],
            },
          },
          {
            label: "Facilitate you rental deal",
            question: {
              title: "Services",
              services: [
                {
                  title: "Rent Contract",
                  description:
                    "Quickly and easily create legally compliant rental contracts.",
                },
                {
                  title: "Finance Brokerage Commission",
                  description:
                    "Ensure you earn your full brokerage commissions by financing the amount to landlords and tenants, with Rentak transferring the amount directly to your bank.",
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

  return (
    <div className="mb-12 flex-1 rounded-3xl bg-white/85 p-6 text-center lg:mb-0">
      <h3 className="text-xl font-medium text-primary-800">
        Find the perfect service with <span className="font-bold">rentak</span>
      </h3>
      <h2 className="mt-4 text-3xl font-semibold text-primary-900">
        {currentQuestion.title}
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
            <span>{answer.label}</span>
          </button>
        ))}
        {currentQuestion.services?.map((answer) => (
          <button
            className="flex items-center justify-start gap-2 rounded-3xl bg-white p-4 text-slate-700 transition duration-300 hover:bg-primary-800/80 hover:text-white"
            key={answer.title}
          >
            <SquareCheckBigIcon className="size-6" />
            {answer.title}
          </button>
        ))}
      </div>
    </div>
  );
}
