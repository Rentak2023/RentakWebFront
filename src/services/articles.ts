import ky from "@fetcher";
import { type Locale } from "next-intl";

type Article = {
  id: number;
  title: string;
  description: string;
  author: string;
  picture: string;
  slug: string;
  meta_description: string;
  meta_keywords: string;
  created: string;
};

type ArticlesResponse = {
  data: Array<Article>;
  message: string;
};

export async function getHomepageArticles(locale: Locale) {
  const res = await ky
    .get("article/get-homepage-articles", {
      searchParams: {
        lang: locale === "en" ? "en" : "ar",
      },
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    })
    .json<ArticlesResponse>();

  return res.data;
}

export async function getAllArticles(locale: Locale) {
  const res = await ky
    .get("article/get-all-articles", {
      searchParams: {
        lang: locale === "en" ? "en" : "ar",
      },
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    })
    .json<ArticlesResponse>();

  return res.data;
}

type ArticleResponse = {
  data?: Article;
  message: string;
};

export async function getArticleBySlug(slug: string, locale: Locale) {
  const res = await ky
    .get("article/get-article-by_slug", {
      searchParams: {
        slug,
        lang: locale === "en" ? "en" : "ar",
      },
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    })
    .json<ArticleResponse>();

  return res.data;
}
