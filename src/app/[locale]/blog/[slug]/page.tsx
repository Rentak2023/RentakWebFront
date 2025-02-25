import Image from "next/image";
import { notFound } from "next/navigation";
import { type Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { getAllArticles, getArticleBySlug } from "@/services/articles";

import MorePosts from "./more-posts";

// export const generateStaticParams = async () => {
//   const articles = await getAllArticles("en");

//   articles.map((article) => ({ slug: article.slug }));
// };

export const generateMetadata = async (props: {
  params: Promise<{ slug: string; locale: Locale }>;
}) => {
  const { slug, locale } = await props.params;

  const article = await getArticleBySlug(decodeURI(slug), locale);
  if (!article) return notFound();
  return {
    title: article.title,
    description: article.meta_description,
    keywords: article.meta_keywords,
    alternates: {
      canonical: `/blog/${slug}`,
      languages: {
        en: `/blog/${slug}`,
        ar: `/ar/blog/${slug}`,
      },
    },
  };
};

const PostLayout = async (
  props: Readonly<{ params: Promise<{ slug: string; locale: Locale }> }>,
) => {
  const { slug, locale } = await props.params;

  setRequestLocale(locale);

  const article = await getArticleBySlug(decodeURI(slug), locale);
  if (article == null) return notFound();

  return (
    <div>
      <article className="mx-auto mt-20 max-w-xl py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-semibold">{article.title}</h1>
        </div>
        <div className="relative mb-8 min-h-96">
          <Image
            src={article.picture}
            alt={article.title}
            fill
            className="mx-auto mb-8 size-full overflow-hidden rounded-2xl object-cover"
          />
        </div>
        <div
          className="prose prose-slate md:prose-lg lg:prose-xl"
          // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
          dangerouslySetInnerHTML={{
            __html: article.description,
          }}
        />
      </article>
      <MorePosts />
    </div>
  );
};

export default PostLayout;
