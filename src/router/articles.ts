import * as v from "valibot";

import { pub } from "@/orpc";
import { ArticleSchema } from "@/schemas/articles";
import { LocaleSchema } from "@/schemas/common";

export const homeArticlesList = pub
  .route({
    method: "GET",
    path: "/homepage-articles",
    summary: "Get homepage articles",
    tags: ["articles"],
  })
  .input(LocaleSchema)
  .output(v.array(ArticleSchema))
  .handler(async ({ context, input }) => {
    const res = await context.fetcher
      .get("article/get-homepage-articles", {
        searchParams: {
          lang: input,
        },
      })
      .json<{ data: Array<v.InferOutput<typeof ArticleSchema>> }>();

    return res.data;
  });

export const articlesList = pub
  .route({
    method: "GET",
    path: "/articles",
    summary: "List all articles",
    tags: ["articles"],
  })
  .input(LocaleSchema)
  .output(v.array(ArticleSchema))
  .handler(async ({ context, input }) => {
    const res = await context.fetcher
      .get("article/get-all-articles", {
        searchParams: {
          lang: input,
        },
      })
      .json<{ data: Array<v.InferOutput<typeof ArticleSchema>> }>();

    return res.data;
  });

export const findArticle = pub
  .route({
    method: "GET",
    path: "/article",
    summary: "Get article by id",
    tags: ["articles"],
  })
  .input(
    v.object({
      slug: v.string(),
      lang: LocaleSchema,
    }),
  )
  .output(v.nullable(ArticleSchema))
  .handler(async ({ input, context }) => {
    const res = await context.fetcher
      .get("article/get-article-by_slug", {
        searchParams: {
          slug: input.slug,
          lang: input.lang,
        },
      })
      .json<{ data: v.InferOutput<typeof ArticleSchema> | null }>();

    return res.data;
  });

export default {
  home: homeArticlesList,
  list: articlesList,
  find: findArticle,
};
