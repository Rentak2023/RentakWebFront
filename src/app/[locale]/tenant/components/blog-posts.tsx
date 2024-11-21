import { allPosts } from "@content";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

const createExcerpt = (body: string) => {
  return body.replaceAll(/<[^>]+>/g, "").slice(0, 200);
};

export default function BlogPosts() {
  const locale = useLocale();
  const t = useTranslations("tenant.blog");

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-primary-900 sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg/8 text-slate-600">{t("subtitle")}</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {allPosts.map((post) => (
            <article
              key={post._id}
              className="flex flex-col items-start justify-between"
            >
              <div className="relative w-full">
                <Image
                  width={384}
                  height={256}
                  alt=""
                  src={post.image}
                  className="aspect-[16/9] w-full rounded-2xl bg-slate-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="group relative">
                  <h3 className="mt-6 text-lg/6 font-semibold text-primary-900 group-hover:text-slate-600">
                    <a href={post.url}>
                      <span className="absolute inset-0" />
                      {locale === "en" ? post.title : post.arTitle}
                    </a>
                  </h3>
                  <p className="mt-4 line-clamp-3 text-sm/6 text-slate-600">
                    {createExcerpt(
                      locale === "en" ? post.content.html : post.arContent.html,
                    )}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
