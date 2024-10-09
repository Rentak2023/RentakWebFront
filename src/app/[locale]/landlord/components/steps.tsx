import { useId } from "react";

const steps = [
  {
    title: "Get Started with Ease",
    color: "#D6BCFA",
  },
  {
    title: "Professional Unit Photography & Inspection",
    color: "#FEB2B2",
  },
  {
    title: "Maximize Exposure",
    color: "#FBD38D",
  },
  {
    title: "Find the Perfect Tenant",
    color: "#9AE6B4",
  },
  {
    title: "Seamless Contract Signing",
    color: "#D6BCFA",
  },
  {
    title: "Hassle-Free Rent Collection",
    color: "#FBD38D",
  },
];

function Dashes({ from, to }: { from: string; to: string }) {
  const id = useId();
  return (
    <div className="absolute start-1 top-[70px] -z-10 flex w-[40px] items-center justify-center max-lg:rotate-90 max-lg:scale-[1.8] lg:start-[60%] lg:top-6 lg:w-full rtl:lg:rotate-180">
      <svg
        width="303"
        height="16"
        viewBox="0 0 303 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 3H303V13H0V3Z" fill={`url(#${id})`}></path>
        <path
          d="M25.3452 2.03174L30.972 7.78935C31.3517 8.17793 31.3517 8.79863 30.972 9.18722L25.3452 14.9448"
          stroke="white"
          strokeWidth="3"
        ></path>
        <path
          d="M58.3452 2.03174L63.972 7.78935C64.3517 8.17793 64.3517 8.79863 63.972 9.18722L58.3452 14.9448"
          stroke="white"
          strokeWidth="3"
        ></path>
        <path
          d="M91.3452 2.03174L96.972 7.78935C97.3517 8.17793 97.3517 8.79863 96.972 9.18722L91.3452 14.9448"
          stroke="white"
          strokeWidth="3"
        ></path>
        <path
          d="M124.345 2.03174L129.972 7.78935C130.352 8.17793 130.352 8.79863 129.972 9.18722L124.345 14.9448"
          stroke="white"
          strokeWidth="3"
        ></path>
        <path
          d="M157.345 2.03174L162.972 7.78935C163.352 8.17793 163.352 8.79863 162.972 9.18722L157.345 14.9448"
          stroke="white"
          strokeWidth="3"
        ></path>
        <path
          d="M190.345 2.03174L195.972 7.78935C196.352 8.17793 196.352 8.79863 195.972 9.18722L190.345 14.9448"
          stroke="white"
          strokeWidth="3"
        ></path>
        <path
          d="M223.345 2.03174L228.972 7.78935C229.352 8.17793 229.352 8.79863 228.972 9.18722L223.345 14.9448"
          stroke="white"
          strokeWidth="3"
        ></path>
        <path
          d="M256.345 2.03174L261.972 7.78935C262.352 8.17793 262.352 8.79863 261.972 9.18722L256.345 14.9448"
          stroke="white"
          strokeWidth="3"
        ></path>
        <path
          d="M289.345 2.03174L294.972 7.78935C295.352 8.17793 295.352 8.79863 294.972 9.18722L289.345 14.9448"
          stroke="white"
          strokeWidth="3"
        ></path>
        <defs>
          <linearGradient
            id={id}
            x1="6.56397"
            y1="8"
            x2="294.672"
            y2="8.0001"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={from}></stop>
            <stop offset="1" stopColor={to}></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Steps() {
  return (
    <section className="mt-28">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-semibold tracking-tight text-primary-900">
          Getting started is easy, sign up in minutes
        </h2>
        <div className="mx-auto mt-16 flex flex-col items-center justify-start">
          <div className="grid auto-cols-auto gap-10 lg:grid-cols-6">
            {steps.map((step, index) => {
              const nextStep = steps.at(index + 1);
              return (
                <div
                  className="relative flex min-h-12 flex-col items-start justify-start gap-3 ps-[60px] lg:min-h-fit lg:items-center lg:ps-0"
                  key={step.title}
                >
                  <div className="z-10 flex size-12 items-center justify-center max-lg:absolute max-lg:inset-0 max-lg:end-auto lg:size-16">
                    <svg
                      width="65"
                      height="65"
                      viewBox="0 0 65 65"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="32.8413"
                        cy="32.9512"
                        r="32"
                        fill={step.color}
                      ></circle>
                      <path
                        d="M50.4511 39.3892C50.168 40.2801 49.5109 41.0035 48.6511 41.3705L31.1436 48.8566L30.7556 48.6723C22.8719 44.9292 21.8162 44.3631 21.5771 44.1785L22.9479 42.7822C24.0229 43.3419 28.278 45.3838 31.1848 46.764L47.9035 39.6146H47.9037C48.2533 39.4653 48.5206 39.1712 48.6355 38.8089C48.7505 38.4464 48.7014 38.052 48.5016 37.7285C48.3396 37.4641 48.0883 37.2664 47.7932 37.1708C47.4982 37.0752 47.1787 37.0881 46.8923 37.207L34.1615 42.4448L28.0775 39.3439L28.9425 37.6458L34.2471 40.3491L36.4511 39.4395H36.4513C36.1054 38.7388 35.6538 38.0952 35.1125 37.5315C31.4901 33.7725 24.6618 33.5053 20.6388 36.9208L18.8354 36.0303C18.9308 35.8879 19.0478 35.7614 19.1822 35.6549C23.8923 31.4347 32.1384 31.6987 36.4863 36.2051C37.1945 36.9425 37.7796 37.7886 38.2196 38.7112L46.1641 35.442C46.9227 35.1292 47.7722 35.1186 48.5384 35.4118C49.3047 35.7053 49.9296 36.2808 50.2852 37.0201C50.6408 37.7595 50.7003 38.6069 50.4511 39.3887L50.4511 39.3892Z"
                        fill="black"
                      ></path>
                      <path
                        d="M33.6627 31.9565L29.8589 28.1527L31.2079 26.8034L33.6628 29.2583L38.197 24.7246L39.546 26.0736L33.6627 31.9565Z"
                        fill="black"
                      ></path>
                      <path
                        d="M45.9915 28.3423C45.9951 30.5319 45.3571 32.6746 44.1565 34.5058H41.7713C43.1044 32.9769 43.9058 31.0569 44.0556 29.0339C44.2053 27.011 43.6953 24.994 42.6021 23.2856C41.5089 21.5767 39.891 20.2686 37.9916 19.5569C36.092 18.8453 34.0129 18.7687 32.066 19.3384C30.1192 19.9081 28.4094 21.0933 27.1931 22.7168C25.9768 24.3402 25.3195 26.3141 25.3197 28.3426C25.3184 29.356 25.4838 30.3626 25.8095 31.3226H23.8123C23.5443 30.352 23.4094 29.3495 23.4116 28.3426C23.4116 25.3482 24.6011 22.4767 26.7184 20.3595C28.8357 18.2423 31.7074 17.0527 34.7015 17.0527C37.6959 17.0527 40.5674 18.2422 42.6846 20.3595C44.8017 22.4768 45.9913 25.3485 45.9913 28.3426L45.9915 28.3423Z"
                        fill="black"
                      ></path>
                    </svg>
                  </div>
                  {nextStep && <Dashes from={step.color} to={nextStep.color} />}
                  <div className="max-w-[90%] text-start tracking-tight text-slate-600 lg:text-center lg:text-xl">
                    {index + 1}. {step.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
