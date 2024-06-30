import { getTranslations } from "next-intl/server";

const PropertiesHeader = async () => {
  const t = await getTranslations("units");

  return (
    <div className="mx-auto px-4 text-center">
      <div className="mt-10">
        <div className="flex flex-col items-center">
          <div className="flex max-w-full items-baseline justify-items-center gap-2">
            <h3 className="text-xl font-medium leading-normal text-[#0F172A] md:text-6xl md:leading-normal">
              {t("findA")}
            </h3>
            <div className="flex flex-col items-center">
              <h3 className="z-10 text-xl font-medium leading-normal text-primary-600 md:text-6xl md:leading-normal">
                {t("perfectHome")}
              </h3>
              <div className="mt-[-20px] md:mt-[-32px]">
                <svg
                  width="435"
                  height="43"
                  viewBox="0 0 435 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="max-w-28 md:max-w-full"
                >
                  <path
                    d="M211.335 1.50987C184.338 -0.555756 131.748 3.46119 81.8873 11.3967L70.1174 13.2724C37.0326 18.5538 19.1603 22.2358 6.50299 26.379C1.56296 27.9963 1.13122 28.212 1.17896 29.039C1.25161 30.2458 2.03828 30.1534 11.1369 27.87C20.552 25.5072 28.9355 23.9734 51.8673 20.4186C128.51 8.53779 164.112 5.06459 203.625 5.61529C211.368 5.72265 223.603 7.3012 223.52 8.18192C223.409 9.35788 215.348 12.4663 196.796 18.4862C173.972 25.8919 160.026 30.9456 158.707 32.2876C156.452 34.5818 158.497 36.6683 163.317 36.9934C166.071 37.1793 166.703 37.1495 179.5 36.218C216.24 33.548 239.635 32.7508 271.207 33.0937C319.286 33.6166 349.792 35.3105 406.942 40.6326C427.477 42.5452 428.543 42.6008 432.428 41.9567L432.496 41.9457C433.742 41.744 434.084 40.1316 432.91 39.6246C429.889 38.3224 427.832 38.0302 410.028 36.3831C350.344 30.8601 318.834 29.0669 272.974 28.5877C248.856 28.3352 238.086 28.4724 220.433 29.2577C208.364 29.7945 176.459 31.7369 171.97 32.2071C169.522 32.4645 180.411 28.6036 199.477 22.4555C223.595 14.677 228.467 12.3669 228.851 8.53381C229.284 4.2117 225.189 2.56953 211.335 1.50987Z"
                    fill="#C0D9F3"
                  />
                </svg>
              </div>
            </div>
          </div>
          <h3 className="text-xl font-medium leading-normal text-[#0F172A] md:text-6xl md:leading-normal">
            {t("thatYouLove")}
          </h3>
          <div className="w-full max-w-xl">
            <p className="text-xs md:text-xl">{t("description")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesHeader;
