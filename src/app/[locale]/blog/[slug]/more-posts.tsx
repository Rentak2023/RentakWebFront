import Image from "next/image";
import { getLocale } from "next-intl/server";

import { getHomepageArticles } from "@/services/articles";

import { createExcerpt } from "../../tenant/components/blog-posts";

export default async function MorePosts() {
  const locale = await getLocale();

  const articles = await getHomepageArticles(locale);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-primary-900 text-balance text-3xl font-semibold tracking-tight">
            More blogs
          </h2>
        </div>
        <hr className="my-8 bg-slate-500" />
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {articles.map((post) => (
            <article
              key={post.id}
              className="flex flex-col items-start justify-between"
            >
              <div className="relative w-full">
                <Image
                  width={384}
                  height={256}
                  alt=""
                  src={post.picture}
                  className="aspect-16/9 sm:aspect-2/1 lg:aspect-3/2 w-full rounded-2xl bg-slate-100 object-cover"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="group relative">
                  <h3 className="text-primary-900 mt-6 text-lg/6 font-semibold group-hover:text-slate-600">
                    <a href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-4 line-clamp-3 text-sm/6 text-slate-600">
                    {createExcerpt(post.description)}
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
