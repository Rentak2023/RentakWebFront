import { useId } from "react";

function Dashes({ from, to }: { from: string; to: string }) {
  const id = useId();
  return (
    <div className="absolute start-1 top-[70px] -z-10 flex w-[40px] items-center justify-center max-md:rotate-90 max-md:scale-[1.8] md:start-[60%] md:top-6 md:w-full rtl:md:rotate-180">
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
          stroke-width="3"
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
            <stop stop-color={from}></stop>
            <stop offset="1" stop-color={to}></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Steps() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-semibold tracking-tight text-slate-900">
          Getting started is easy, sign up in minutes
        </h2>
        <div className="mx-auto mt-8 flex w-full max-w-4xl flex-col items-center justify-start">
          <div className="grid auto-cols-auto gap-10 md:grid-cols-4">
            <div className="relative flex min-h-12 flex-col items-start justify-center gap-3 ps-[60px] md:min-h-fit md:items-center md:ps-0">
              <div className="z-10 flex size-12 items-center justify-center max-md:absolute max-md:inset-0 max-md:end-auto md:size-16">
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
                    fill="#D6BCFA"
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
              <Dashes from="#D6BCFA" to="#FEB2B2" />
              <div className="max-w-[90%] whitespace-nowrap text-start tracking-tight text-slate-600 md:text-center md:text-xl">
                1. Submit address
              </div>
            </div>
            <div className="relative flex min-h-12 flex-col items-start justify-center gap-3 ps-[60px] md:min-h-fit md:items-center md:ps-0">
              <div className="z-10 flex size-12 items-center justify-center max-md:absolute max-md:inset-0 max-md:end-auto md:size-16">
                <svg
                  width="61"
                  height="60"
                  viewBox="0 0 61 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="30.2031" cy="30" r="30" fill="#FEB2B2"></circle>
                  <path
                    d="M17.0469 40.9878C17.0469 35.4715 21.3152 31 26.5807 31H28.4874C33.753 31 38.0213 35.4715 38.0213 40.9878"
                    stroke="#2D3748"
                    stroke-width="1.8"
                    stroke-miterlimit="10"
                    strokeLinecap="square"
                  ></path>
                  <path
                    d="M27.5328 31.001C30.692 31.001 33.2531 28.318 33.2531 25.0083C33.2531 21.6986 30.692 19.0156 27.5328 19.0156C24.3736 19.0156 21.8125 21.6986 21.8125 25.0083C21.8125 28.318 24.3736 31.001 27.5328 31.001Z"
                    stroke="#2D3748"
                    stroke-width="1.8"
                    stroke-miterlimit="10"
                    strokeLinecap="square"
                  ></path>
                  <line
                    x1="38.1656"
                    y1="28.3031"
                    x2="45.9525"
                    y2="28.3031"
                    stroke="#2D3748"
                    stroke-width="1.8"
                    strokeLinecap="round"
                  ></line>
                  <line
                    x1="41.9781"
                    y1="24.3297"
                    x2="41.9781"
                    y2="32.0867"
                    stroke="#2D3748"
                    stroke-width="1.8"
                    strokeLinecap="round"
                  ></line>
                </svg>
              </div>
              <Dashes from="#FEB2B2" to="#FBD38D" />

              <div className="max-w-[90%] whitespace-nowrap text-start tracking-tight text-slate-600 md:text-center md:text-xl">
                2. Add signers
              </div>
            </div>
            <div className="relative flex min-h-12 flex-col items-start justify-center gap-3 ps-[60px] md:min-h-fit md:items-center md:ps-0">
              <div className="z-10 flex size-12 items-center justify-center max-md:absolute max-md:inset-0 max-md:end-auto md:size-16">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="61"
                  height="60"
                  viewBox="0 0 61 60"
                  fill="none"
                >
                  <circle cx="30.7969" cy="30" r="30" fill="#FBD38D"></circle>
                  <path
                    d="M34.2934 37.7567L34.8387 37.0406L34.2934 37.7567ZM34.293 37.7566L35.0724 37.3066L34.293 37.7566ZM38.1584 40.6997L37.6132 41.4158L38.1584 40.6997ZM39.1653 35.1577L40.0581 35.0435L39.1653 35.1577ZM40.0581 35.0435L40.6489 39.6631L38.8634 39.8915L38.2726 35.2718L40.0581 35.0435ZM29.5895 16.6167L39.8189 34.3345L38.26 35.2345L28.0306 17.5167L29.5895 16.6167ZM23.8793 17.7195L26.994 15.9212L27.894 17.4801L24.7793 19.2783L23.8793 17.7195ZM33.5136 38.2066L23.1838 20.3149L24.7427 19.4149L35.0724 37.3066L33.5136 38.2066ZM37.6132 41.4158L33.7482 38.4727L34.8387 37.0406L38.7037 39.9837L37.6132 41.4158ZM33.8406 36.9788C34.1535 36.7967 34.5475 36.8189 34.8387 37.0406L33.7482 38.4727C34.0392 38.6943 34.4331 38.7166 34.7459 38.5345L33.8406 36.9788ZM35.0724 37.3066C34.8233 36.8752 34.2712 36.7282 33.8406 36.9788L34.7459 38.5345C34.3151 38.7852 33.7627 38.6382 33.5136 38.2066L35.0724 37.3066ZM24.7793 19.2783C24.7315 19.306 24.7151 19.3671 24.7427 19.4149L23.1838 20.3149C22.6592 19.4062 22.9705 18.2442 23.8793 17.7195L24.7793 19.2783ZM28.0306 17.5167C28.003 17.4688 27.9418 17.4524 27.894 17.4801L26.994 15.9212C27.9028 15.3965 29.0648 15.7079 29.5895 16.6167L28.0306 17.5167ZM40.6489 39.6631C40.8628 41.3354 38.9545 42.4372 37.6132 41.4158L38.7037 39.9837C38.7312 40.0047 38.7478 40.0065 38.7568 40.0069C38.7708 40.0074 38.7917 40.0037 38.8142 39.9907C38.8368 39.9777 38.8504 39.9614 38.8569 39.9491C38.8611 39.9411 38.8678 39.9258 38.8634 39.8915L40.6489 39.6631ZM38.2726 35.2718C38.2709 35.2587 38.2666 35.246 38.26 35.2345L39.8189 34.3345C39.9448 34.5527 40.0261 34.7936 40.0581 35.0435L38.2726 35.2718Z"
                    fill="#2D3748"
                  ></path>
                  <path
                    d="M38.0625 40.1945H32.9104L30.7334 37.7914L30.1685 40.1945L28.4396 36.2869L27.7809 40.1945L25.7532 34.5664L23.8928 40.1945H21.1014"
                    stroke="#2D3748"
                    stroke-width="1.6"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </div>
              <Dashes from="#FBD38D" to="#9AE6B4" />

              <div className="max-w-[90%] whitespace-nowrap text-start tracking-tight text-slate-600 md:text-center md:text-xl">
                3. Sign Contract
              </div>
            </div>
            <div className="relative flex min-h-12 flex-col items-start justify-center gap-3 ps-[60px] md:min-h-fit md:items-center md:ps-0">
              <div className="z-10 flex size-12 items-center justify-center max-md:absolute max-md:inset-0 max-md:end-auto md:size-16">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="61"
                  height="60"
                  viewBox="0 0 61 60"
                  fill="none"
                >
                  <circle cx="30.3828" cy="30" r="30" fill="#9AE6B4"></circle>
                  <path
                    d="M19.0938 21.2656H37.5726"
                    stroke="#2D3748"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M19.0938 34.6602H28.3332"
                    stroke="#2D3748"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M19.0938 27.9609H29.5052"
                    stroke="#2D3748"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  ></path>
                  <circle
                    cx="34.1494"
                    cy="32.0078"
                    r="5.81818"
                    transform="rotate(-45 34.1494 32.0078)"
                    stroke="#2D3748"
                    strokeWidth="1.8"
                  ></circle>
                  <path
                    d="M41.4088 40.537C41.7602 40.8885 42.3301 40.8885 42.6815 40.537C43.033 40.1855 43.033 39.6157 42.6815 39.2642L41.4088 40.537ZM37.7152 36.8434L41.4088 40.537L42.6815 39.2642L38.988 35.5706L37.7152 36.8434Z"
                    fill="#2D3748"
                  ></path>
                </svg>
              </div>
              <div className="max-w-[90%] whitespace-nowrap text-start tracking-tight text-slate-600 md:text-center md:text-xl">
                4. Get listed
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
