import BackgroundVideo from "next-video/background-video";

// eslint-disable-next-line import-x/no-unresolved
import getStarted from "/videos/rentak-marks.mp4";

const guarantees = ["Late tenant payment", "Non-payment", "Home is vacant"];

export default function Header() {
  return (
    <div className="bg-white">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-100/20">
        <div className="container mx-auto items-center px-4 pb-24 pt-10 sm:px-6 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40 xl:max-w-7xl">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-xl">
                <h1 className="mt-10 text-balance text-3xl font-semibold tracking-tight text-[#322659] sm:text-5xl">
                  Maximize Your Rental Income with Guaranteed Peace of Mind
                </h1>
                <p className="mt-6 text-lg text-slate-700">
                  Rentak transforms property management with technology-driven
                  solutions and guaranteed rent, so you can sit back and relax.
                </p>
                {/* <p className="mt-12 text-lg text-slate-700">
                  With the Guarantee, you get paid even if:
                </p>
                <ul className="mt-4 flex items-center gap-6">
                  {guarantees.map((guarantee) => (
                    <li key={guarantee} className="flex items-center gap-1.5">
                      <svg
                        width="23"
                        height="23"
                        viewBox="0 0 23 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-6 text-primary-600"
                      >
                        <path
                          d="M11.5 22.4199C17.5751 22.4199 22.5 17.4951 22.5 11.4199C22.5 5.34479 17.5751 0.419922 11.5 0.419922C5.42487 0.419922 0.5 5.34479 0.5 11.4199C0.5 17.4951 5.42487 22.4199 11.5 22.4199Z"
                          fill="currentColor"
                        />
                        <path
                          d="M6.28125 11.7082L9.78643 15.2138L16.7248 8.27539"
                          stroke="white"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>

                      <span className="text-slate-700">{guarantee}</span>
                    </li>
                  ))}
                </ul> */}
                {/* <div className="mt-10 flex items-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Documentation
                  </a>
                  <a
                    href="#"
                    className="text-sm font-semibold leading-6 text-slate-900"
                  >
                    View on GitHub <span aria-hidden="true">→</span>
                  </a>
                </div> */}
              </div>
            </div>
          </div>
          <div className="relative mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            {/* <Image src={headerBackground} alt="" className="rounded-3xl" /> */}
            <BackgroundVideo
              src={getStarted}
              className="overflow-hidden rounded-3xl"
              style={{ aspectRatio: "1/1" }}
              loop
            />

            {/* <div className="absolute -end-52 top-8 h-52 w-72 overflow-hidden rounded-2xl bg-white p-4 shadow">
              <Image
                src={historyImage}
                alt=""
                className="h-full object-cover object-left"
              />
            </div>
            <div className="absolute -bottom-8 -start-8 h-52 w-44 overflow-hidden rounded-2xl bg-white shadow">
              <Image
                src={propertyImage}
                alt=""
                className="h-full object-cover object-left-top"
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
